import os
import json
import time
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_message_with_ai(subject, content, message_date):
    prompt = f"""
    You are an intelligent email processing assistant. Analyze the following message and return a strict JSON object ONLY.
    
    Message Subject: {subject}
    Message Content: {content}
    Message Date: {message_date}

    Return a JSON object with exactly these keys:
    - "summary": A brief 1-sentence summary.
    - "category": The category (e.g., Client Request, Complaint, Meeting, General Info).
    - "intent": The primary intent (e.g., Requesting Action, Providing Info).
    - "priority": Must be exactly "High", "Medium", or "Low".
    - "requires_response": Boolean (true or false).
    - "suggested_reply": A professional draft reply if true, otherwise null.
    - "extracted_tasks": An array of task objects. If there are no actionable tasks, return [].
        Each task object must have:
        - "title": Short title.
        - "description": What needs to be done.
        - "due_date": MUST be a strict ISO 8601 string (e.g., "2026-11-17T17:00:00") or null. 
        
    CRITICAL RULES:
    1. ONLY extract a due_date if a specific calendar date is explicitly written in the message (e.g., "November 5th", "2026-11-05"). 
    2. If the message uses relative terms like "Thursday", "tomorrow", or "next week", you MUST return null for due_date. DO NOT calculate or invent deadlines.
    3. If purely informational, return an empty array for "extracted_tasks" and false for "requires_response".
    """

    max_retries = 5
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model='gemini-3.5-flash', 
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                ),
            )
            return json.loads(response.text)
            
        except Exception as e:
            error_msg = str(e)
            if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg or "503" in error_msg or "UNAVAILABLE" in error_msg:
                if attempt < max_retries - 1:
                    wait_time = 2 ** (attempt + 1)
                    print(f"API limit reached. Retrying in {wait_time} seconds... (Attempt {attempt+1}/{max_retries})")
                    time.sleep(wait_time)
                    continue
            
            print(f"AI Error: {e}")
            return None