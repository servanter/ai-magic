import { imageConfigs } from "@/config/imageConfig";
import { editImageWithPrompt } from "@/lib/aliyun/aliyun";
import { getCurrentUser } from "@/lib/session";
import { checkStatus, decrementBoostPack } from "@/lib/usage/usage";
import { UserInfo } from "@/types/user";
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import { IncomingMessage } from 'http';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const user = (await getCurrentUser()) as UserInfo;
  const form = new IncomingForm();

  try {
    // Create proper stream for formidable
    const chunks: Uint8Array[] = [];
    const reader = request.body?.getReader();

    if (!reader) {
      throw new Error('No request body found');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const bodyBuffer = Buffer.concat(chunks);

    let paused = false;
    const mockIncomingMessage = {
      headers: Object.fromEntries(request.headers.entries()),
      pause: () => { paused = true; },
      resume: () => { paused = false; },
      on: (event: string, listener: (...args: any[]) => void) => {
        if (event === 'data' && !paused) {
          listener(bodyBuffer);
        } else if (event === 'end') {
          listener();
        }
        return mockIncomingMessage;
      },
      socket: {},
      connection: {},
      httpVersion: '1.1',
      httpVersionMajor: 1,
      httpVersionMinor: 1
    } as unknown as IncomingMessage;

    const formData = await new Promise<{ files: any, fields: any }>((resolve, reject) => {
      form.parse(mockIncomingMessage, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('Parsed files:', files); // 打印解析后的 files 对象
        resolve({ files, fields });
      });
    });

    const file = Array.isArray(formData.files.file) ? formData.files.file[0] : formData.files.file;
    if (!file) {
      throw new Error('No file found in form data');
    }
    const fileSize = file.size;
    const typeArray = formData.fields.type;

    // 从请求中获取提示词
    // 将数组中的字符串转换为数字
    const typeValue = Array.isArray(typeArray) && typeArray.length > 0 ? parseInt(typeArray[0]) : 1;
    const prompt = imageConfigs.find(config => config.type === typeValue)?.prompt || imageConfigs[0].prompt;

    // 将上传的图片转换为 base64
    const fileContent = await fs.readFile(file.filepath);
    const base64Image = `data:${file.mimetype};base64,${fileContent.toString('base64')}`;


    const usage = await checkStatus({ userId: user.userId });
    console.log('User usage info:', usage);
    if (usage.boostPackRemaining <= 0) {
      return NextResponse.json({ error: 'Insufficient boost pack balance. Please recharge.', status: 403, code: 403 });
    }

    let imageUrl = await editImageWithPrompt(prompt, base64Image);


    // 只有在成功生成图片后才扣减用户的 boostPack
    if (imageUrl) {
      await decrementBoostPack({ userId: user.userId });
    }

    return NextResponse.json({
      message: imageUrl ? 'success' : 'pending',
      code: imageUrl ? 0 : 1,
      size: fileSize,
      img: imageUrl || undefined
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}


