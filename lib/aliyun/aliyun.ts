
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
  // const url = 'https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const data = {
    model: "qwen-image-2.0",
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
