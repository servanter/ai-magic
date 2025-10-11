/**
 * 调用阿里云 DashScope API 生成图片
 * @param prompt 生成图片的描述文本
 * @returns 返回包含 task_id 和 request_id 的对象（如果 task_status 为 PENDING）
 */
export async function generateImageWithPrompt(prompt: string): Promise<{ task_id: string; request_id: string }> {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    throw new Error('DASHSCOPE_API_KEY 未配置');
  }

  const url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis';
  const headers = {
    'X-DashScope-Async': 'enable',
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const data = {
    model: 'wan2.2-t2i-flash',
    input: {
      prompt,
    },
    parameters: {
      size: '1024*1024',
      n: 1,
    },
  };

  console.log('调用 DashScope API，参数:', data);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log('DashScope API 请求失败:', response);
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const result = await response.json();
    console.log('DashScope API 返回结果:', result);
    if (result.output?.task_status === 'PENDING') {
      return {
        task_id: result.output.task_id,
        request_id: result.request_id,
      };
    }

    throw new Error(`任务状态异常: ${result.output?.task_status}`);
  } catch (error) {
    console.error('调用 DashScope API 失败:', error);
    throw error;
  }
}

/**
 * 根据 taskId 查询任务结果
 * @param taskId 任务 ID
 * @returns 返回结构化结果：成功时 { code: 0, img: url }，失败时 { code: -1 }
 */
export async function getTaskResult(taskId: string): Promise<{ code: number; img?: string }> {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    throw new Error('DASHSCOPE_API_KEY 未配置');
  }

  const url = `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`;
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
  };

  try {
    const response = await fetch(url, { headers });
    console.log('查询任务结果响应:', response);
    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const result = await response.json();
    if (result.output?.task_status === 'SUCCEEDED') {
      return {
        code: 0,
        img: result.output.results[0]?.url,
      };
    }

    return { code: -1 };
  } catch (error) {
    console.error('查询任务结果失败:', error);
    return { code: -1 };
  }
}

/**
 * 调用阿里云 DashScope API 的图像编辑功能
 * @param prompt 图像编辑的描述文本
 * @param imageBase64 Base64编码的图片内容，格式为 data:{mime_type};base64,{base64_data}
 * @returns 返回编辑后的图片URL
 */
export async function editImageWithPrompt(prompt: string, imageBase64: string): Promise<string> {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    throw new Error('DASHSCOPE_API_KEY 未配置');
  }

  const url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const data = {
    model: "qwen-image-edit",
    input: {
      messages: [
        {
          role: "user",
          content: [
            {
              image: imageBase64
            },
            {
              text: prompt
            }
          ]
        }
      ]
    },
    parameters: {
      negative_prompt: "",
      watermark: false
    }
  };



  console.log('prompt:', prompt)
  console.log('调用 DashScope 图像编辑 API，参数:', { ...data, input: { messages: [{ role: 'user', content: [{ image: '(base64图像已省略)', text: prompt }] }] } });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log('DashScope 图像编辑 API 请求失败:', response);
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const result = await response.json();
    console.log('DashScope 图像编辑 API 返回结果:', result);

    // 从返回结果中提取图片URL
    const imageUrl = result.output?.choices?.[0]?.message?.content?.[0]?.image;

    if (!imageUrl) {
      throw new Error('未能从响应中获取图片URL');
    }

    console.log('获取到图片URL:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('调用 DashScope 图像编辑 API 失败:', error);
    throw error;
  }
}
