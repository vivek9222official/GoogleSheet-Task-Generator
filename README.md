# Google Sheet Task Generator (Apps Script)

## 📋 Overview
This Google Apps Script automates task generation for exhibitions.  
It reads exhibition details from one sheet, doer task templates from another,  
and generates a full task list in a third sheet — while marking done exhibitions automatically.

## 🚀 Features
- Generates tasks for each exhibition.
- Marks "Done" in the exhibition sheet once processed.
- Auto-calculates plan date (based on -5 days rule).
- Syncs plan time from Doer Task sheet.
- Supports custom menu button for easy task generation.

## 🧩 Sheets Used
- **Doer Task:** Task templates, doer names, plan offset, time.
- **Exhibition:** City, Venue, Dates, Remarks.
- **Tasks:** Output of all generated tasks.

## ⚙️ How to Use
1. Open Google Sheet → Extensions → Apps Script.
2. Copy the full script code from this repository.
3. Paste into your Sheet’s Apps Script editor.
4. Save → Reload the Sheet.
5. Use menu **⚙️ Task Generator → Generate Tasks**.
6. Done! Tasks will be auto-generated and exhibitions marked “Done”.

---
👨‍💻 Created by: [Your Name]
📅 Last Updated: October 2025
