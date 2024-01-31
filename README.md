# blogger-dashboard-utility
Google Blogger dashboard utlity.

Blog post (early release) : https://xmlexpr.blogspot.com/2024/01/blogger-dashboard-utility-updates.html

# Installation
1. Clone or download this repository. Extract the .zip file, then put in a folder.
2. Open Chrome extensions (chrome://extensions) and enable Developer mode.
3. Click **Load unpacked**, pick the folder where you put this repository files on point 1.

# Features
1. Post editor keyboard shortcuts.
2. Notification on template HTML update. Auto close in 2 seconds.
3. Display widget ID below gadget item in Layout editor.

## Post Editor Keyboard Shortcuts
- Ctrl + S : Update post (for drafts)
- Ctrl + M : Add yellow text background to selection (useful for custom text mark).
- Ctrl + 5 : Format Paragraph (`<p>`).
- Ctrl + Space : Remove formatting on selection.

## Template Save Status Notification
The current notification is somewhat of a workaround. Can't find easy way to detect failed status when saving template.

Message | Condition
--- | ---
Template updated | No errors when saving template.
Check for errors | Either it takes too long to receive the success status, or there's an error when saving the template.