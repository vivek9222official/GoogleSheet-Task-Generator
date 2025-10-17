// ========================
// Google Sheet Task Generator
// ========================

function generateTasksForExhibitions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const doerTaskSheet = ss.getSheetByName('Doer Task');
  const exhibitionSheet = ss.getSheetByName('Exhibition');
  const taskSheet = ss.getSheetByName('Tasks');

  // --- Get all data ---
  const doerTasks = doerTaskSheet.getRange(2, 1, doerTaskSheet.getLastRow() - 1, 4).getValues();
  const exhibitions = exhibitionSheet.getRange(2, 1, exhibitionSheet.getLastRow() - 1, 5).getValues();

  const allTasks = [];

  exhibitions.forEach((ex, index) => {
    const [city, venue, fromDate, toDate, remarks] = ex;

    if (remarks && remarks.toString().toLowerCase() === 'done') return;
    if (!city || !fromDate || !toDate) return;

    doerTasks.forEach(task => {
      const [taskDesc, doer, taskPlan, timePlanRaw] = task;
      if (!taskDesc || !doer) return;

      let planDate;
      if (taskPlan && !isNaN(taskPlan)) {
        planDate = calcOffsetDate(fromDate, Number(taskPlan));
      } else {
        planDate = calcDefaultPlanDate(fromDate);
      }

      const planTime = formatTime(timePlanRaw);

      allTasks.push([
        doer,
        city,
        taskDesc,
        formatDate(fromDate),
        formatDate(toDate),
        formatDate(planDate),
        planTime
      ]);
    });

    exhibitionSheet.getRange(index + 2, 5).setValue('Done');
  });

  const lastRow = taskSheet.getLastRow();
  const startRow = lastRow > 1 ? lastRow + 1 : 2;

  if (allTasks.length > 0) {
    taskSheet.getRange(startRow, 1, allTasks.length, 7).setValues(allTasks);
  }

  SpreadsheetApp.getUi().alert('✅ Tasks Generated with City, Smart Dates & Synced Time!');
}

function calcDefaultPlanDate(fromDate) {
  const d = new Date(fromDate);
  d.setDate(d.getDate() - 1);
  return d;
}

function calcOffsetDate(fromDate, offsetDays) {
  const d = new Date(fromDate);
  d.setDate(d.getDate() + offsetDays);
  return d;
}

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${("0" + d.getDate()).slice(-2)}-${monthNames[d.getMonth()]}-${d.getFullYear()}`;
}

function formatTime(timeValue) {
  if (!timeValue) return '23:59';

  if (timeValue instanceof Date) {
    return Utilities.formatDate(timeValue, Session.getScriptTimeZone(), 'HH:mm');
  }

  let t = timeValue.toString().trim().replace('.', ':').toUpperCase();
  const timeMatch = t.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/);
  if (!timeMatch) return '23:59';

  let hour = parseInt(timeMatch[1]);
  let minute = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
  const ampm = timeMatch[3];

  if (ampm === 'PM' && hour < 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;

  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('⚙️ Task Generator')
    .addItem('Generate Tasks', 'generateTasksForExhibitions')
    .addToUi();
}
