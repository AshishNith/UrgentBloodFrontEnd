import sys
import json
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="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",
)

def chat(user_message):
    completion = client.chat.completions.create(
        # extra_headers={
        #     "HTTP-Referer": "<YOUR_SITE_URL>",  # Optional. Site URL for rankings on openrouter.ai.
        #     "X-Title": "<YOUR_SITE_NAME>",  # Optional. Site title for rankings on openrouter.ai.
        # },
        # extra_body={},
        model="deepseek/deepseek-r1-zero:free",
        messages=[
            {
                "role": "user",
                "content": user_message
            }
        ]
    )
    
    response_message = completion.choices[0].message.content
    return json.dumps({"response": response_message})

if __name__ == '__main__':
    user_input = input("Enter your message: ")
    response = chat(user_input)
    print(response)