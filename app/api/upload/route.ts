import { IncomingForm } from 'formidable';
import { IncomingMessage } from 'http';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
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
    const type = formData.fields.type;
    console.log('Uploaded file:', file);
    console.log('Uploaded file size:', fileSize);
    console.log('Uploaded file type:', type);

    return NextResponse.json({ message: 'success', code: 0, size: fileSize, type });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
