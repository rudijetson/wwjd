import anthropic

client = anthropic.Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key="my_api_key",
)

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=3015,
    temperature=0,
    system=" ",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": " "
                }
            ]
        }
    ]
)
print(message.content)