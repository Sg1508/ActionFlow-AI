import json
from datetime import datetime, timedelta

messages = [
    {"id": "MSG001", "type": "email", "sender": {"name": "Rahul Sharma", "email": "rahul@example.com"}, "recipient": "team@example.com", "subject": "Website Launch", "date": "2026-11-02T10:30:00+05:30", "content": "Please complete the payment gateway integration and share the staging URL before Thursday.", "attachments": []},
    {"id": "MSG002", "type": "email", "sender": {"name": "Priya Patel", "email": "priya@client.com"}, "recipient": "support@example.com", "subject": "Server Down", "date": "2026-11-02T11:15:00+05:30", "content": "URGENT! Our production server is completely down. Clients cannot log in. Fix this immediately.", "attachments": []},
    {"id": "MSG003", "type": "message", "sender": {"name": "Amit Kumar", "email": "amit@example.com"}, "recipient": "hr@example.com", "subject": "Leave Request", "date": "2026-11-02T12:00:00+05:30", "content": "Hi, I would like to request leave for next Monday and Tuesday due to a family emergency.", "attachments": []},
    {"id": "MSG004", "type": "email", "sender": {"name": "Neha Gupta", "email": "neha@example.com"}, "recipient": "team@example.com", "subject": "Weekly Newsletter", "date": "2026-11-02T14:00:00+05:30", "content": "Here is the weekly newsletter highlighting our top articles on AI and web development. Enjoy reading!", "attachments": []},
    {"id": "MSG005", "type": "email", "sender": {"name": "Vikram Singh", "email": "vikram@client.com"}, "recipient": "sales@example.com", "subject": "Invoice Discrepancy", "date": "2026-11-02T15:30:00+05:30", "content": "I noticed a discrepancy in invoice #4512. You charged us for 10 licenses but we only ordered 5. Please resolve this by tomorrow.", "attachments": []},
    # ... Add 15-25 more messages covering complaints, follow-ups, meetings, etc. (Use ChatGPT to generate the rest quickly if needed)
]

# Fill up to 25 messages with dummy data for speed
for i in range(6, 26):
    messages.append({
        "id": f"MSG00{i}",
        "type": "email",
        "sender": {"name": f"User {i}", "email": f"user{i}@example.com"},
        "recipient": "team@example.com",
        "subject": f"General Inquiry {i}",
        "date": datetime.now().isoformat(),
        "content": f"This is a sample message {i} for testing. Please review the attached document and let me know if you have any questions.",
        "attachments": []
    })

with open("sample_messages.json", "w") as f:
    json.dump({"messages": messages}, f, indent=2)

print("sample_messages.json generated successfully!")