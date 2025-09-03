
// Tower.im UI Auto-Translate (EN) - v0.6.1
// NEW: translate placeholders/titles/aria-* attributes; observe attribute changes.
// Keeps STRICT by default; auto-RELAXED in activity feeds. Regex-capture rules for dynamic sentences.

(function () {
  const STORAGE_ENABLED = "towerim_translate_enabled";
  const STORAGE_MODE = "towerim_translate_mode"; // "strict" | "relaxed"
  const STORAGE_ACTIVITY = "towerim_translate_activity_relaxed"; // boolean
  const MONTHS_EN_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let enabled = true;
  let mode = "strict";
  let activityRelaxed = true;

  // DICT (shortened here for brevity; includes key tails)
  const DICT = {
    "所有项目": "All projects",
    "我的项目": "My projects",
    "返回最新": "Back to latest",
    "项目": "Projects",
    "任务": "Tasks",
    "子任务": "subtasks",
    "清单": "Lists",
    "看板": "Board",
    "日历": "Calendar",
    "列表": "List",
    "时间线": "Timeline",
    "里程碑": "Milestones",
    "文档": "Documents",
    "文件": "Files",
    "文件夹": "Folders",
    "讨论": "Discussions",
    " 条讨论": " discussions",
    "成员": "Members",
    "标签": "Tags",
    "优先级": "Priority",
    "状态": "Status",
    "负责人": "Assignee",
    "创建人": "Creator",
    "创建时间": "Created",
    "编辑于": "Edited at",
    "截止日期": "Due date",
    "开始时间": "Start date",
    "完成时间": "Completed on",
    "描述": "Description",
    "评论": "Comments",
    "附件": "Attachments",
    "活动": "Activity",
    "动态": "Activity",
    "桌面版在线": "Online on desktop",
    "筛选动态": "Filter activity",
    "新增": "New",
    "新增任务": "New task",
    "新增项目": "New project",
    "保存": "Save",
    "取消": "Cancel",
    "编辑": "Edit",
    "删除": "Delete",
    "筛选": "Filter",
    "设置": "Settings",
    "批量导入任务": "Bulk import tasks",
    "查看已归档清单": "View archived lists",
    "导出为 Excel": "Export to Excel",
    "子任务以树状结构显示": "Show subtasks as tree structure",
    "复制链接": "Copy link",
    "排序": "Sort",
    "搜索": "Search",
    "更多": "More",
    "提交": "Submit",
    "确认": "Confirm",
    "关闭": "Close",
    "打开": "Open",
    "等待中": "Pending",
    "进行中": "In Progress",
    "已完成": "Completed",
    "逾期": "Overdue",
    "未开始": "Not started",
    "今天": "Today",
    "明天": "Tomorrow",
    "昨天": "Yesterday",
    "今": "T",
    "昨": "Y",
    "刚刚": "Just now",
    "全部": "All",
    "我的": "Mine",
    "我自己": "My",
    "未指派": "Unassigned",
    "提醒": "Reminder",
    "重复": "Repeat",
    "工时": "Time tracking",
    "耗时": "Time spent",
    "估时": "Estimate",
    "汇总": "Summary",
    "统计": "Reports",
    "仪表盘": "Dashboard",
    "模板": "Template",
    "归档": "Archive",
    "问题设置": "Issue settings",
    "通知": "Notifications",
    "团队": "Team",
    "部门": "Department",
    "展开": "Expand",
    "收起": "Collapse",
    "收起全部": "Collapse all",
    "展开全部": "Expand all",
    "加载中": "Loading…",
    "没有更多了": "No more",
    "创建": "Create",
    "分享": "Share",
    "提交审核": "Submit for approval",
    "通过": "Approve",
    "驳回": "Reject",
    "草稿": "Draft",
    "公开": "Public",
    "私有": "Private",
    "进展": "Progress",
    "项目成员": "Project members",
    "任务成员": "Task members",
    "清单成员": "List members",
    "看板成员": "Board members",
    "日历成员": "Calendar members",
    "文件成员": "File members",
    "讨论成员": "Discussion members",
    "汇报": "Report",
    "填写汇报": "Fill report",
    "工作周报": "Weekly report",
    "知识库": "Knowledge",
    "个人知识库": "My Knowledge",
    "团队知识库": "Team Knowledge",
    "最后修改人": "Last modified by",
    "最后修改时间": "Last modified at",
    "操作": "Actions",
    "移动": "Move",
    "目录管理": "Directory management",
    "拖拽文档、文件或文件夹即可修改知识库目录顺序。": "Drag documents, files or folders to modify the knowledge base directory order.",
    "创建知识库": "Create knowledge",
    "团队知识库的内容对团队内所有成员公开，你可以将它用于和团队成员共享与同步知识。": "The team knowledge base is visible to all team members. Use it to share and sync knowledge with your team.",
    "创建文档": "Create document",
    "文档夹": "Document folder",
    "普通文档": "Document",
    "导入本地文件": "Import local file",
    "查看全部文档": "View all documents",
    "上传文件": "Upload file",
    "上传文件，便于整理和查找资料": "Upload files for organization and reference",
    "上传文件夹": "Upload folder",
    "选择文件夹": "Select folder",
    "所有文件": "All files",
    "回收站": "Trash",
    "从项目添加文档和文件": "Add document and file from project",
    "取消文件夹置顶": "Unpin folder",
    "创建文件夹": "Create folder",
    "输入文件夹标题": "Enter folder title",
    "输入文件夹简介（可选）": "Enter folder description (optional)",
    "文件排序": "Sort files",
    "还没有填写回答": "No answer yet",
    "Emoji表情": "Emoji",
    "有序列表": "Ordered list",
    "无序列表": "Unordered list",
    "块引用": "Quote",
    "代码": "Code",
    "插入链接": "Insert link",
    "插入图像": "Insert image",
    "插入视频": "Insert video",
    "代码块": "Code block",
    "插入表格": "Insert table",
    "分割线": "Divider",
    "对齐": "Align",
    "增加缩进": "Increase indent",
    "减少缩进": "Decrease indent",
    "资源卡片": "Resource card",
    "正文": "Content",
    "标题 1": "Heading 1",
    "标题 2": "Heading 2",
    "标题 3": "Heading 3",
    "回复": "Reply",
    "知道了": "Noted",
    "所有成员": "All members",
    "收藏": "Favorite",
    "取消收藏": "Unfavorite",
    "日程": "Calendar",
    "个人设置": "Personal settings",
    "退出团队": "Exit team",
    "团队设置": "Team settings",
    "管理设置": "Management settings",
    "全局设置": "Global settings",
    "管理后台": "Admin console",
    "工作台": "Workspace",
    "头像、姓名、密码、Notifications等": "Avatar, name, password, notifications, etc.",
    "付费、Team、应用中心等": "Billing, team, app center, etc.",
    "应用中心": "App Center",
    "企业微信、Tower API 等": "WeCom, Tower API, etc.",
    "退出登录": "Log out",
    "头像、姓名、密码、通知等": "Avatar, password, notifications, etc.",
    "付费、团队、应用中心等": "Billing, team, app center, etc.",
    "选择新头像": "Choose new avatar",
    "你可以选择 png/jpg 图片作为头像": "You can choose PNG/JPG images as your avatar",
    "上传头像": "Upload avatar",
    "上传": "Upload",
    "确认上传": "Confirm upload",
    "取消上传": "Cancel upload",
    "上传成功": "Upload successful",
    "上传失败": "Upload failed",
    "姓名": "Name",
    "邮箱": "Email",
    "修改邮箱": "Change email",
    "修改密码": "Change password",
    "修改通知设置": "Change notification settings",
    "名片": "Business card",
    "手机": "Phone number",
    "更换手机": "Change phone number",
    "微信": "WeChat",
    "双保险": "Two-factor authentication",
    "启用后，每次登录 Tower 都需要使用你的微信进行验证，增强账号安全性": "After enabling, you must verify via WeChat each time you log in to Tower for better account security.",
    "已信任当前计算机，登录时无需验证": "Trusted this computer. No verification needed when logging in.",
    "清除受信任计算机列表": "Clear trusted computers",
    "密码": "Password",
    "确认密码": "Confirm password",
    "桌面通知：关闭": "Desktop notifications: Off",
    "桌面通知：开启": "Desktop notifications: On",
    "App通知：关闭": "App notifications: Off",
    "App通知：开启": "App notifications: On",
    "微信通知：开启": "WeChat notifications: On",
    "微信通知：关闭": "WeChat notifications: Off",
    "邮件通知：关闭": "Email notifications: Off",
    "邮件通知：开启": "Email notifications: On",
    "智能提醒：关闭": "Smart reminders: Off",
    "智能提醒：开启": "Smart reminders: On",
    "时区设置": "Timezone settings",
    "默认首页": "Default page",
    "列表详情": "List details",
    "弹窗打开": "Open in modal",
    "侧滑打开": "Open in sidebar",
    "网页背景": "Page background",
    "设置网页背景": "Set page background",
    "通知设置": "Notification settings",
    "- 没有新通知 -": "- No new notifications -",
    "查看所有通知": "View all notifications",
    "邀请新成员": "Invite new members",
    "添加新成员": "Add new members",
    "通过公开链接，快速邀请": "Invite quickly via public link",
    "将下面的公共邀请链接通过微信，QQ或钉钉等方式发送给需要邀请的人": "Send the public invitation link below via WeChat, QQ or DingTalk to the people you want to invite",
    "通过微信扫码，邀请好友": "WeChat scan to invite friends",
    "用微信扫描二维码获取邀请函，转发给微信好友/群，即可邀请他们加入你的团队。": "Scan the QR code with WeChat to get an invitation and forward it to friends/groups to invite them to your team.",
    "访客": "Visitor",
    "当前团队还没有访客": "No visitors yet",
    "分组管理": "Group management",
    "项目模板": "Project template",
    "已归档项目": "Archived projects",
    "已删除项目": "Deleted projects",
    "添加任务": "Add task",
    "添加清单": "Add list",
    "编辑清单": "Edit list",
    "归档清单": "Archive list",
    "删除清单": "Delete list",
    "已归档清单": "Archived lists",
    "清单颜色": "List color",
    "所属清单": "List",
    "按清单分组": "Group by list",
    "按负责人分组": "Group by assignee",
    "按创建人分组": "Group by creator",
    "按优先级分组": "Group by priority",
    "不分组": "Don't group",
    "任务字段": "Task fields",
    "任务ID": "Task ID",
    "所属项目": "Project",
    "显示/隐藏自定义字段": "Show/hide custom fields",
    "自定义字段": "Custom fields",
    "添加自定义字段": "Add custom field",
    "创建新字段": "Create new field",
    "从团队字段库选择": "Select from team fields library",
    "团队字段": "Team fields",
    "管理字段": "Manage fields",
    "字段名称*": "Field name*",
    "字段类型*": "Field type*",
    "文本字段": "Text field",
    "数字字段": "Number field",
    "日期字段": "Date field",
    "多项选择": "Multi-select",
    "单项选择": "Single select",
    "是非字段": "Yes/no field",
    "成员选择": "Member select",
    "超链接字段": "Link field",
    "选择需要添加到项目的字段": "Select fields to add to project",
    "协作人": "Collaborators",
    "协作部门": "Collaborative departments",
    "信心指数": "Confidence index",
    "预算": "Budget",
    "目标权重": "Target weight",
    "完成百分比%": "Completion %",
    "备注": "Note",
    "显示/隐藏任务字段": "Show/hide task fields",
    "默认": "Default",
    "我负责的": "My tasks",
    "本周的": "This week's",
    "自定义筛选": "Custom filter",
    "保存为新的视图": "Save as new view",
    "未完成任务": "Incomplete tasks",
    "已完成任务": "Completed tasks",
    "点击添加任务": "Click to add task",
    "添加新任务": "Add new task",
    "点击发表评论": "Click to add comment",
    "输入评论内容": "Enter comment content",
    "发表评论": "Add comment",
    "查看更多动态": "View more activity",
    "（查看更多动态）": "(View more activity)",
    "还没有成员会收到通知": "No one will receive notifications",
    "有新动态通知我": "Notify me of new activity",
    "这些人会收到通知：": "These people will receive notifications:",
    "编辑通知列表": "Edit notification list",
    "编辑通知成员": "Edit notification members",
    "停止接收该内容的通知": "Stop receiving notifications for this content",
    "截止时间": "Due date",
    "开始时间": "Start date",
    "完成人": "Completed by",
    "包含": "Contains",
    "不包含": "Does not contain",
    "为空": "Is empty",
    "不为空": "Is not empty",
    "请选择": "Please select",
    "添加过滤条件": "Add filter condition",
    "输入关键字查询": "Enter keyword to search",
    "添加标签": "Add tag",
    "编辑标签": "Edit tag",
    "删除标签": "Delete tag",
    "标签颜色": "Tag color",
    "标签名称": "Tag name",
    "展开所有子任务": "Expand all subtasks",
    "收起所有子任务": "Collapse all subtasks",
    "添加日程": "Add calendar event",
    "+ 添加日历": "+ Add calendar",
    "创建日程": "Create event",
    "在这里输入日程标题": "Enter event title here",
    "类型": "Type",
    "全天日程": "All-day event",
    "开始": "Start",
    "结束": "End",
    "不重复": "Does not repeat",
    "每日": "Daily",
    "每周": "Weekly",
    "每月": "Monthly",
    "每年": "Yearly",
    "隔周": "Every other week",
    "不提醒": "No reminder",
    "日程开始时": "When the event starts",
    "提前五分钟": "Five minutes before",
    "提前十五分钟": "Fifteen minutes before",
    "提前三十分钟": "Thirty minutes before",
    "提前一小时": "One hour before",
    "提前两小时": "Two hours before",
    "提前一天": "One day before",
    "提前两天": "Two days before",
    "提前一周": "One week before",
    "日程参与人": "Participants",
    "点击添加成员": "Click to add members",
    "添加成员": "Add members",
    "所有人": "Everyone",
    "添加": "Add",
    "地点": "Location",
    "在月视图显示创建者": "Show creator in month view",
    "还没有日程安排": "No calendar events",
    "显示偏好": "Display preferences",
    "显示头像": "Show avatar",
    "显示任务": "Show tasks",
    "显示子任务": "Show subtasks",
    "只看我的": "Mine only",
    "订阅日程": "Subscribe to calendar",
    "导出日程": "Export calendar",
    "显示农历": "Show lunar calendar",
    "法定假日": "Public holidays",
    "任务颜色": "Task color",
    "管理成员": "Manage members",
    "成员变化记录": "Member change records",
    "查看更多": "View more",
    "移除了": "removed",
    "邀请了": "invited",
    "加入": "joined",
    "选择项目成员": "Select project members",
    "链接邀请": "Link invite",
    "微信邀请": "WeChat invite",
    "扫码邀请": "Scan invite",
    "上次登录：": "Last login: ",
    "按截止日期排序": "Sort by due date",
    "按创建日期排序": "Sort by creation date",
    "自定义排序": "Custom sort",
    "按项目分组": "Group by project",
    "查看完成的任务": "View completed tasks",
    "查看创建的任务": "View created tasks",
    "普通": "Normal",
    "较低": "Low",
    "较高": "High",
    "最高": "Highest",
    "无负责人": "No assignee",
    "过滤动态": "Filter activity",
    "项目设置": "Project settings",
    "项目公开性": "Project visibility",
    "简单描述项目，便于其他人理解（选填）": "Briefly describe the project for others to understand (optional)",
    "对访客隐藏敏感内容": "Hide sensitive content from visitors",
    "项目类型": "Project type",
    "简单模式": "Simple mode",
    "一页管理任务、文件、文档、讨论，适用于小型团队或者新手用户": "Manage tasks, files, documents and discussions on one page. Suitable for small teams or new users.",
    "高级模式": "Advanced mode",
    "提供列表、看板、时间线等多种视图管理任务，适合于想进一步提升任务协作效率的团队": "Provide list, board, timeline and other views to manage tasks. Suitable for teams seeking higher collaboration efficiency.",
    "创建新项目": "Create new project",
    "项目公共性": "Project visibility",
    "私有项目": "Private project",
    "公开项目": "Public project",
    "空白项目": "Blank project",
    "模板中心": "Template center",
    "我的模板": "My templates",
    "熟悉 Tower": "Learn Tower",
    "分类:": "Category:",
    "市场营销": "Marketing",
    "研发管理": "R&D management",
    "产品设计": "Product design",
    "产品运营": "Product operation",
    "人事管理": "HR management",
    "销售管理": "Sales management",
    "法律法务": "Legal and compliance",
    "电商运营": "E-commerce operation",
    "专业服务": "Professional services",
    "所有": "All",
    "短视频广告投放": "Deliver short video ads",
    "内容编辑流程": "Content editing process",
    "社交媒体内容投放": "Deliver social media content",
    "营销活动管理": "Marketing activity management",
    "线下活动": "Offline event",
    "招聘管理": "Recruitment management",
    "入职流程": "Onboarding process",
    "视频制作排期": "Video production schedule",
    "公众号文章排期": "Wechat article schedule",
    "视频制作流程": "Video production process",
    "找不到想要的模版？": "Can't find the template you want?",
    "提交需求": "Submit request",
    "项目进展": "Project progress",
    "在一个页面跟踪多个项目的进展，并查看汇总和统计": "Track progress of multiple projects on one page and view summaries and statistics",
    "如何设置成员权限": "How to set member permissions",
    "保存进展成员": "Save progress members",
    "正常": "Normal",
    "低风险": "Low risk",
    "高风险": "High risk",
    "已失控": "Uncontrolled",
    "选择进展成员": "Select progress members",
    "管理员可以邀请和移除进展成员，只有被邀请的团队成员才能访问该进展的信息。点击这里查看更多": "The administrator can invite and remove progress members. Only team members who have been invited can access the information of this progress. Click here to view more",
    "创建进展": "Create progress",
    "添加进展详情": "Add progress details",
    "进展名称": "Progress name",
    "还没有项目": "No projects yet",
    "添加一个或多个项目以查看进展": "Add one or more projects to view progress",
    "添加项目": "Add project",
    "退出项目": "Exit project",
    "项目状态": "Project status",
    "起止时间": "Start and end time",
    "订阅项目组": "Subscribe project group",
    "添加项目详情": "Add project details",
    "项目名称": "Project name",
    "创建项目": "Create project",
    "你还没有创建项目模板": "You haven't created any project templates",
    "如何创建?": "How to create?",
    "调整项目模块": "Arrange project modules",
    "你可以拖动模块调整位置，隐藏的模块可随时恢复。": "Drag modules to adjust the order. Hidden modules can be restored anytime.",
    "管理项目成员": "Manage project members",
    "管理标签": "Manage tags",
    "标签管理": "Tag management",
    "项目标签": "Project tags",
    "新建项目标签": "Create project tag",
    "仅在项目内使用": "Use only in this project",
    "全局标签": "Global tags",
    "新建全局标签": "Create global tag",
    "可在所有项目内使用": "Available in all projects",
    "使用 webhooks，你可以在 企业微信 ， 钉钉 等工具上接收项目的最新动态。": "Use webhooks to receive project updates in WeCom, DingTalk and other tools.",
    "添加Webhook": "Add Webhook",
    "请填入第三方工具提供的 webhook 地址，点击创建后，我们将向其推送相应消息。": "Enter the webhook URL from the third-party tool. After creating, we will push messages to it.",
    "URL 地址": "URL address",
    "密钥（选填）": "Secret (optional)",
    "你需要发送哪些事件？": "Which events do you want to send?",
    "发送所有事件": "Send all events",
    "自定义发送事件": "Customize events",
    "归档项目": "Archive project",
    "项目归档后，将不再出现在 Tower 里。你可以通过激活操作，将项目重新恢复正常。": "After archiving, the project will no longer appear in Tower. You can reactivate it anytime.",
    "了解，归档这个项目": "Understood. Archive this project",
    "复制成项目模板": "Copy as project template",
    "把这个项目复制为项目模板，将只保留此项目里未完成的任务清单和任务，不会保留评论。": "Copy this project as a template. Only incomplete lists and tasks will be kept. Comments won't be kept.",
    "复制这个项目": "Copy this project",
    "删除项目": "Delete project",
    "项目删除后，所有的内容也将被立刻删除，请谨慎操作。": "Deleting the project will immediately remove all its contents. Proceed with caution.",
    "了解风险，删除这个项目": "I understand the risks. Delete this project",
    "输入标题，回车创建": "Enter title, press Enter to create",
    "清单外任务": "Tasks outside the list",
    "选择负责人": "Select assignee",
    "设置优先级": "Set priority",
    "设置截止时间": "Set due date",
    "设置开始时间": "Set start date",
    "设置完成时间": "Set completion time",
    "设置任务标签": "Set task tags",
    "任务描述": "Task description",
    "查看历史版本": "Version history",
    "添加所属项目": "Add to project",
    "添加任务描述": "Add task description",
    "添加任务标签": "Add task tags",
    "上传任务附件": "Upload task attachments",
    "创建任务": "Create task",
    "上传新附件": "Upload new attachment",
    "附件中心": "Attachments center",
    "添加子任务": "Add subtask",
    "进阶子任务": "Advanced subtask",
    "开启进阶子任务后,该任务的所有子任务均可以进行评论、上传附件、添加自定义字段等操作": "After enabling advanced subtasks, all subtasks of this task can comment, upload attachments, add custom fields, etc.",
    "已完成的任务排最后": "Sort completed tasks at the end",
    "开始任务": "Start task",
    "添加任务依赖": "Add task dependency",
    "移除任务依赖": "Delete task dependency",
    "父任务": "Parent task",
    "输入 #Tasks编号 或关键字查询": "Enter #Tasks number or keyword to search",
    "任务依赖": "Task dependency",
    "请选择依赖的任务": "Select the dependent task",
    "前置任务": "Prerequisite task",
    "后置任务": "Postrequisite task",
    "公开分享": "Share publicly",
    "通过链接将此页面内容分享到团队之外": "Share this page content to outside the team through a link",
    "生成分享链接": "Generate share link",
    "公开团队内的评论": "Public team comments",
    "需要输入密码查看": "Password required",
    "分享链接自动过期": "Link expires automatically",
    "催一下": "Remind",
    "复制任务": "Copy task",
    "指定父任务": "Specify parent task",
    "移除父任务": "Remove parent task",
    "转为里程碑": "Convert to milestone",
    "查看了任务": "Viewed task",
    "创建了任务": "Created task",
    "编辑了任务描述": "Edited task description",
    "将任务完成时间从": "Changed due date from",
    "修改为": "to",
    "没有截止日期": "No due date",
    "将任务指派给了": "Assigned task to",
    "将子任务指派给了": "Assigned subtask to",
    "完成了任务": "Completed task",
    "查看已完成任务": "View completed tasks",
    "删除了任务": "Deleted task",
    "完成了子任务": "Completed subtask",
    "创建了子任务": "Created subtask",
    "查看了子任务": "Viewed subtask",
    "回复了任务": "Replied to task",
    "将任务添加到": "Add task to",
    "将任务优先级从": "Set the priority from",
    "赞了评论": "Liked comment",
    "重新打开了任务": "Reopened task",
    "重新打开了子任务": "Reopened subtask",
    "开始处理这条任务": "Start processing this task",
    "开始处理这条子任务": "Start processing this subtask",
    "创建了项目": "Created project",
    "上传了附件": "Uploaded attachment",
    "在下一行添加新的任务": "Add new task on the next line",
    "删除任务": "Delete task",
    "确定删除吗": "Are you sure you want to delete?",
    "确定": "Confirm",
    "查看全部通知": "View all notifications",
    "全部标记为已读": "Mark all as read",
    "全部通知": "All notifications",

    "申请加入团队": "Apply to join team",
    "加入申请": "Join request",
    "审批通过": "Approve",
    "拒绝申请": "Reject",
    "全选": "Select all",
    "全不选": "Select none",
    "申请处理完毕": "Request processed",
    "你可以": "You can",
    "回到团队页面": "Go to team page",
    "权限": "Permission",
    "管理员": "Admin",
    "参与的项目": "Participating projects", 
    "已激活的项目": "Active projects",
    "输入项目名称": "Enter project name",
    "双保险状态": "Dual-insurance status",
    "可访问的日历": "Accessible calendar",
    "团队日历": "Team calendar",
    "可访问的知识库": "Accessible knowledge base",
    "需要回答的汇报问题": "Questions to answer for reports",
    "本周还没有提交汇报": "No reports submitted this week",
    "按时间查看": "View by time",
    "按成员查看": "View by member",
    "按问题查看": "View by question",
    "汇报设置": "Report settings",
    "汇报问题设置": "Report question settings",
    "填写我的回答": "Fill in my report",
    "新建汇报问题": "New report question",
    "问题名称": "Question name",
    "工作周报": "Weekly report",
    "问题描述": "Question description",
    "上下拖动可对问题进行排序": "Drag up and down to sort the questions",
    "请总结上周工作内容，并提交本周工作计划": "Please summarize the work content of last week and submit the work plan for this week",
    "回答日期": "Answer date",
    "回答时间": "Answer time",
    "汇报提醒": "Report reminder",
    "提醒成员回答汇报问题": "Remind members to answer report questions",
    "回答成员": "Answer member",
    "谁可以看": "Who can view",
    "周报": "Weekly report",
    "日报": "Daily report",
    "月报": "Monthly report",
    "输入项目名称": "Enter project name",
    "双保险状态": "2FA status",
    "可访问的日历": "Accessible calendar",
    "团队日历": "Team calendar",
    "可访问的知识库": "Accessible knowledge base",
    "需要回答的汇报问题": "Questions to answer for reports",
    "名片仅在当前团队显示，你可以在不同团队填写不同信息。": "The business card is only displayed in the current team. You can fill in different information in different teams.",
    "设置在「HINOMI/汇诺美」中的名片": "Set in \"HINOMI/汇诺美\" business card",
    "添加开始日期": "Add start date",
    "设置具体时间": "Set specific time",
    "设置定期循环": "Set regular cycle",
    "本周": "This week",
    "下周": "Next week",
    "清空": "Clear",
    "本周一": "Monday this week",
    "本周二": "Tuesday this week",
    "本周三": "Wednesday this week",
    "本周四": "Thursday this week",
    "本周五": "Friday this week",
    "本周六": "Saturday this week",
    "本周日": "Sunday this week",
    "周一": "Monday",
    "周二": "Tuesday",
    "周三": "Wednesday",
    "周四": "Thursday",
    "周五": "Friday",
    "周六": "Saturday",
    "周日": "Sunday",
    "一月": "January",
    "二月": "February",
    "三月": "March",
    "四月": "April",
    "五月": "May",
    "六月": "June",
    "七月": "July",
    "八月": "August",
    "九月": "September",
    "十月": "October",
    "十一月": "November",
    "十二月": "December",
    "填写工作签名": "Set work status",
    "你现在的工作Status？": "What is your current work status?",
    "🐟 持续摸鱼中": "🐟 Goofing off",
    "🗒 会议轰炸中": "🗒 Back-to-back meetings",
    "💊 生病难受中": "💊 Feeling unwell",
    "✈️ 出差奔波中": "✈️ Business trip",
    "🏠 在家办公中": "🏠 Working from home",
    "💪 卡路里燃烧中": "💪 Working out",
    "🎮 正在玩游戏，勿扰": "🎮 Gaming — do not disturb",
    "🏖 休假充电中": "🏖 On vacation",
    "桌面通知": "Desktop notification",
    "每当有与你相关的新动态，浏览器会弹出通知气泡提醒你。": "Whenever there is new activity related to you, a notification bubble will pop up in your browser to remind you.",
    "关闭桌面通知": "Close desktop notification",
    "开启桌面通知": "Open desktop notification",
    "🔇 关闭通知声音": "🔇 Close notification sound",
    "🔊 开启通知声音": "🔊 Open notification sound",
    "App 通知": "App notification",
    "当网页版 Tower 打开时，不发送通知邮件以及客户端消息推送，开启后可以避免重复通知的打扰。": "When the web version of Tower is open, do not send notification emails and client message push notifications. After enabling, you can avoid the disturbance of repeated notifications.",
    "关闭 App 通知": "Close App notification",
    "开启 App 通知": "Open App notification",
    "邮件通知": "Email notification",
    "新动态通知": "New activity notification",
    "关闭新动态通知邮件": "Close new activity notification email",
    "开启新动态通知邮件": "Open new activity notification email",
    "延期任务通知": "Delayed task notification",
    "关闭延期任务通知邮件": "Close delayed task notification email",
    "开启延期任务通知邮件": "Open delayed task notification email",
    "自定义通知": "Custom notification",
    "到期任务通知": "Overdue task notification",
    "关闭到期任务通知": "Close overdue task notification",
    "开启到期任务通知": "Open overdue task notification",
    "任务自定义字段变更通知": "Task custom field change notification",
    "关闭任务自定义字段变更通知": "Close task custom field change notification",
    "开启任务自定义字段变更通知": "Open task custom field change notification",
    "指定项目": "Specify project",
    "智能提醒": "Smart reminder",
    "关闭智能提醒": "Close smart reminder",
    "网页在线时，不发送邮件通知和客户端推送": "When the web version of Tower is open, do not send email notifications and client push notifications",
    "成员分组管理": "Member group management",
    "还没有成员分组": "No member groups yet",
    "新建分组": "Create new group",
    "新建成员分组": "Create new member group",
    "成员分组名称": "Member group name",
    "选择成员": "Select members",
    "邀请新成员加入分组": "Invite new members to join the group",
    "保存设置": "Save settings",
    "设置团队级别的标签，可以在所有项目中使用。": "Set team-level tags that can be used in all projects.",
    "为团队添加自定义字段，满足更多使用场景。": "Add custom fields for your team to meet more usage scenarios.",
    "启用工时后，你可以对任务的预估工时和实际工时进行管理": "After enabling time tracking, you can manage the estimated and actual time for tasks",
    "项目角色权限": "Project role permissions",
    "启用项目角色权限后，你可以自定义项目的角色和权限。": "After enabling project role permissions, you can customize the roles and permissions for the project.",
    "项目分组": "Project groups",
    "开启项目分组后，可以对项目进行分组管理和查看": "After enabling project groups, you can manage and view projects by groups",
    "安全水印": "Security watermark",
    "使用 Tower 集成的扩展功能以及第三方服务，提升协作效率。": "Use the integrated extensions and third-party services of Tower to improve collaboration efficiency.",
    "批量删除成员": "Delete members in bulk",
    "如果团队成员从今往后都不再需要访问该团队的信息，可以删除他们的账号。": "If a team member no longer needs to access information about the team, you can delete their account.",
    "查看应用": "View applications",
    "升级到专业版": "Upgrade to professional plan",
    "申请合同": "Request contract",
    "发票": "Invoice",
    "近期订单": "Recent orders",
    "详情": "Details",
    "查看全部订单": "View all orders:",
    "当前方案：": "Current plan:",
    "到期时间：": "Expiration date:",
    "成员数量：": "Member count:",
    "存储空间：": "Storage space:",
    "团队序号：": "Team number:",
    "续费": "Renew",
    "升级版本或增加人数": "Upgrade plan or add members",
    "团队创建于 2023年11月02日": "Team created on Nov 02, 2023",
    "了解详情": "Learn more",
    "团队专属客户成功经理": "Team dedicated customer success manager",
    "付款方式": "Payment method",
    "订单状态": "Order status",
    "金额": "Amount",
    "内容": "Content",
    "日期": "Date",
    "欢迎来到应用中心": "Welcome to the app center",
    "使用 Tower 集成的扩展功能以及第三方服务，提升协作效率": "Use the integrated extensions and third-party services of Tower to improve collaboration efficiency",
    "查看": "View",
    "复制": "Copy",

    "本周任务": "This week's tasks",
    "未安排任务": "Unscheduled tasks",
    "已延误任务": "Overdue tasks",
    "延误率统计": "Overdue rate",
    "高级任务搜索": "Advanced task search",
    "搜索任务": "Search tasks",
    "完成状态": "Completion status",
    "请填写": "Please fill in",
    "添加搜索条件": "Add search condition",
    "显示已归档内容": "Show archived content",
    "标题": "Title",
    "未完成": "Incomplete",
    "是": "Yes",
    "且": "and",
    "或": "or",
    "从": "from",
    "新手入门": "New to Tower",
    "视频中心": "Video center",
    "Tower 新功能": "Tower new features",
    "帮助中心": "Help center",
    "绑定": "Bind",
    "绑定后，可直接使用微信登录 Tower.": "After binding, you can directly use WeChat to log in to Tower.",
    "App 通知：开启": "App notification: open",
    "你还有": "You have",
    "个问题尚未填写": " unanswered questions",
    "每周一": "Every Monday",
    "回答": "answer",
    "问题": "question",
    "尚未": "not yet",
    "填写": "filled in",
  };

  const REGEX_RULES = [
    { 
      pattern: /^(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日$/,
      replaceFn: (_m, y, mo, d) => `${MONTHS_EN_SHORT[parseInt(mo,10)-1]} ${String(d).padStart(2,'0')}, ${y}`
    },
    {
      pattern: /^(\d{4})[\s\u3000]*年[\s\u3000]*第[\s\u3000]*(0?[1-9]|[1-4]\d|5[0-3])[\s\u3000]*[周週]$/,
      replaceFn: (_m, y, w) => `Week ${parseInt(w,10)} of ${y}`
    },  
    {
      // “在 15:43 回答了问题” → “Answered  question at 15:43”
      pattern: /^在[\s\u3000]*(\d{1,2}):(\d{2})[\s\u3000]*回答了问题$/,
      replaceFn: (_m, hh, mm) => `Answered the question at ${String(hh).padStart(2,'0')}:${mm}`
    },
    {
      // “2025 年第 19 周” → “Week 19 of 2025”
      pattern: /^(\d{4})[\s\u3000]*年[\s\u3000]*第[\s\u3000]*(0?[1-9]|[1-4]\d|5[0-3])[\s\u3000]*[周週]$/,
      replaceFn: (_m, y, w) => `Week ${parseInt(w,10)} of ${y}`
    },
    {
      // “项目：广告素材策划&设计” → “Project: 广告素材策划&设计”
      // 只替换开头的“项目：”，其余文本原样保留
      pattern: /^项目[\s\u3000]*[:：][\s\u3000]*/u,
      replace: "Project: "
    },       
    {
      // “编辑了任务描述” → “Edited the task description”
      pattern: /^\s*编辑了任务描述\s*$/,
      replace: "Edited the task description"
    },
    // REGEX_RULES 里新增：
    {
      // 2024年7月5日 → Jul 05, 2024
      pattern: /^(\d{4})[\s\u3000]*年[\s\u3000]*(\d{1,2})[\s\u3000]*月[\s\u3000]*(\d{1,2})[\s\u3000]*日$/,
      replaceFn: (_m, y, mo, d) => `${MONTHS_EN_SHORT[parseInt(mo,10)-1]} ${String(d).padStart(2,'0')}, ${y}`
    },
    {
      // 2024-07-05 17:21 → Jul 05, 2024 17:21
      pattern: /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/,
      replaceFn: (_m, y, mo, d, hh, mm) => `${MONTHS_EN_SHORT[parseInt(mo,10)-1]} ${d}, ${y} ${hh}:${mm}`
    },
    
    { pattern: /^共\s*(\d+)\s*人$/, replace: "Total $1 members" },
    { pattern: /^将任务指派给了\s+(.+)$/, replace: "Assigned task to $1" },
    { pattern: /^将任务完成时间从\s+(.+)\s+修改为\s+(.+)$/, replace: "Set the due date from $1 to $2" },
    { pattern: /^将任务优先级从\s+(.+)\s+修改为\s+(.+)$/, replace: "Set the priority from $1 to $2" },
    { pattern: /^将任务添加到\s+(.+)$/, replace: "Add task to $1" },
    { pattern: /^(\d+)\s*小时前$/, replace: "$1 hours ago" },
    // 动态问题数量：你还有 X 个问题尚未填写
    { pattern: /^你还有\s*(\d+)\s*个问题尚未填写$/, replace: "You have $1 unanswered questions" },
    // 工作周报日期：工作周报 (YYYY-MM-DD)
    { pattern: /^工作周报\s*\((\d{4})-(\d{2})-(\d{2})\)$/, replaceFn: (_m, y, mo, d) => `Weekly report (${MONTHS_EN_SHORT[parseInt(mo,10)-1]} ${d}, ${y})` },
    // 时间提醒：每周一 HH:MM 回答
    { pattern: /^每周一\s*(\d{1,2}):(\d{2})\s*回答$/, replaceFn: (_m, hh, mm) => `Every Monday ${String(hh).padStart(2,'0')}:${mm} answer` }
  ];

  // Selectors
  const ALLOW_SELECTOR = [
    "nav", "header", "aside", "footer",
    "button", "a", "label", "summary",
    "[role='button']", "[role='menu']", "[role='menuitem']",
    "[role='tab']", "[role='tablist']", "[role='switch']",
    "[role='link']", "[role='listbox']", "[role='option']",
    "th", "td", "thead", "tbody",
    ".menu", ".submenu", ".toolbar", ".breadcrumb",
    ".tabs", ".tab", ".sidebar", ".filters", ".pagination",
    ".modal", ".dialog", ".popover", ".toast", ".tooltip",
    ".badge", ".tag", ".pill", ".label", ".btn",
    ".kanban", ".list", ".list-item", ".table", ".header-cell",
     "label.due-date .selected-text span.value", ".fake-textarea",
     ".create-time", ".desc",
    ".event-created-at",
    ".event-action", ".event-head a",".attachment-info .link-change-dir",".attachment-info .link-tag-attachment",
    ".page-inner .page-desc"
  ].join(",");

  const BLOCK_SELECTOR = [
    "input", "textarea", "[contenteditable='true']", "[role='textbox']",
    "code", "pre", "script", "style", "noscript",
    "[data-ugc]", "[data-user-content]", "[data-editor]",
    ".comment", ".comments", ".markdown", "article",
    ".ql-editor", ".ProseMirror", ".editor", ".rich-text",
    ".task-title", ".task-content", ".description", ".detail-body"
  ].join(",");

  const ACTIVITY_SELECTOR = [
    ".activity", ".activities", ".log", ".logs", ".history", ".timeline", ".feed", ".changelog", ".event-action"
  ].join(",");

  // Attributes to translate
  const ATTRS = ["placeholder", "title", "aria-label", "aria-placeholder", "data-placeholder", "data-title"];

  function closestMatches(el, selector) {
    try { return el.closest(selector); } catch { return null; }
  }

  function isSkippableNode(node) {
    if (!node || !node.parentElement) return true;
    const p = node.parentElement;
  
    const inSelected   = p.closest && p.closest(".selected-text");
    const inFake       = p.closest && p.closest(".fake-textarea");
    const inButton     = p.closest && p.closest("button, .mdc-button, .tr-button, .mdc-button__label");
    const inCreateTime = p.closest && p.closest(".create-time");
    const inEventAct   = p.closest && p.closest(".event-action, .event-created-at");
    const inEventHeadA = p.closest && p.closest(".event-head a");
    const inAttachLink = p.closest && p.closest(".attachment-info .link-change-dir, .attachment-info .link-tag-attachment"); 
    const inDesc       = p.closest && p.closest(".desc");
    const inPageDesc   = p.closest && p.closest(".page-inner .page-desc");

    if (!inSelected && !inFake && !inButton && !inCreateTime && !inEventAct && !inEventHeadA && !inAttachLink &&
        p.closest && p.closest(BLOCK_SELECTOR)) return true;
  
    const txt = (node.nodeValue || "").trim();
    if (!p.closest(ALLOW_SELECTOR) && txt.length > 16 &&
        !p.closest(ACTIVITY_SELECTOR) && !inButton && !inSelected && !inFake &&
        !inCreateTime && !inEventAct && !inEventHeadA && !inAttachLink && !inDesc && !inPageDesc) return true;
  
    return false;
  }
  
  

  // Persistence
  function saveEnabled(val) { try { chrome.storage && chrome.storage.local.set({ [STORAGE_ENABLED]: val }); } catch {} }
  function saveMode(val) { try { chrome.storage && chrome.storage.local.set({ [STORAGE_MODE]: val }); } catch {} }
  function saveActivity(val) { try { chrome.storage && chrome.storage.local.set({ [STORAGE_ACTIVITY]: val }); } catch {} }
  function loadState(cb) {
    try {
      chrome.storage && chrome.storage.local.get([STORAGE_ENABLED, STORAGE_MODE, STORAGE_ACTIVITY], (res) => {
        if (typeof res[STORAGE_ENABLED] === "boolean") enabled = res[STORAGE_ENABLED];
        if (typeof res[STORAGE_MODE] === "string") mode = res[STORAGE_MODE];
        if (typeof res[STORAGE_ACTIVITY] === "boolean") activityRelaxed = res[STORAGE_ACTIVITY];
        cb && cb();
      });
    } catch { cb && cb(); }
  }

  // Longest-first
  const KEYS_DESC = Object.keys(DICT).sort((a, b) => b.length - a.length);
  function replaceLongestFirst(text) {
    let ranges = [];
    for (const zh of KEYS_DESC) {
      const en = DICT[zh];
      let idx = 0;
      while (true) {
        const found = text.indexOf(zh, idx);
        if (found === -1) break;
        const start = found, end = found + zh.length;
        const overlap = ranges.some(r => !(end <= r.start || start >= r.end));
        if (!overlap) ranges.push({ start, end, en });
        idx = found + zh.length;
      }
    }
    if (ranges.length === 0) return text;
    ranges.sort((a,b)=>a.start-b.start);
    let out = "", prev = 0;
    for (const r of ranges) {
      out += text.slice(prev, r.start) + r.en;
      prev = r.end;
    }
    out += text.slice(prev);
    return out;
  }

  function translateStrictString(str) {
    if (!str || typeof str !== "string") return str;
    const trimmed = str.trim();
    if (Object.prototype.hasOwnProperty.call(DICT, trimmed)) {
      const translated = DICT[trimmed];
      return str.replace(trimmed, translated);
    }
    for (const rule of REGEX_RULES) {
      if (rule.pattern.test(trimmed)) {
        const replaced = typeof rule.replaceFn === "function"
          ? trimmed.replace(rule.pattern, rule.replaceFn)
          : trimmed.replace(rule.pattern, rule.replace);
        return str.replace(trimmed, replaced);
      }
    }
    return str;
  }

  let _lastTitle = "";
  function translateTitleTick() {
    if (!enabled) return;
    const t = document.title || "";
    if (!t || t === _lastTitle) return;
    let out = translateStrictString(t);
    if (out === t) out = translateRelaxedString(t);
    if (out !== t) document.title = out;
    _lastTitle = document.title;
  }

  function translateRelaxedString(str) {
    if (!str || typeof str !== "string") return str;
    const trimmed = str.trim();
    if (trimmed.length === 0) return str;
    if (Object.prototype.hasOwnProperty.call(DICT, trimmed)) {
      const translated = DICT[trimmed];
      return str.replace(trimmed, translated);
    }
    const replaced = replaceLongestFirst(trimmed);
    if (replaced !== trimmed) return str.replace(trimmed, replaced);
    return str;
  }

  function nodeInActivity(node) {
    const p = node && node.parentElement;
    return !!(p && closestMatches(p, ACTIVITY_SELECTOR));
  }

  function translateNodeValue(node) {
    const original = node.nodeValue;
    const txt = original == null ? "" : String(original);
    if (!txt) return;
    const useRelaxed = (mode === "relaxed") || (activityRelaxed && nodeInActivity(node));
    const out = useRelaxed ? translateRelaxedString(txt) : translateStrictString(txt);
    if (out !== txt) node.nodeValue = out;
  }

  function walkAndTranslate(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (isSkippableNode(node)) continue;
      nodes.push(node);
    }
    nodes.forEach(translateNodeValue);
    scanAndTranslateAttributes(root);
  }

// ✅ only for attribute translation skip logic
function shouldSkipElement(el) {
  if (!el) return true;
  if (el.closest && (el.closest(".notranslate") || el.closest("[data-no-translate]"))) return true;

  // 不要对 input/textarea 的属性做屏蔽（placeholder/title/aria-*)
  const tag = el.tagName && el.tagName.toLowerCase();
  if (tag !== "input" && tag !== "textarea") {
    if (el.closest && el.closest(BLOCK_SELECTOR)) return true;
  }
  return false;
}


  function translateAttribute(el, attr) {
    if (!el.hasAttribute(attr)) return;
    const val = el.getAttribute(attr);
    if (!val) return;
    // Attributes are typically UI labels; prefer STRICT first, RELAXED fallback
    let out = translateStrictString(val);
    if (out === val) out = translateRelaxedString(val);
    if (out !== val) el.setAttribute(attr, out);
  }

  function scanAndTranslateAttributes(root) {
    // current node
    if (root.nodeType === Node.ELEMENT_NODE) {
      const el = root;
      if (!shouldSkipElement(el)) {
        ATTRS.forEach(a => translateAttribute(el, a));
      }
    }
    // subtree
    const sel = ATTRS.map(a => `[${a}]`).join(",");
    const nodes = root.querySelectorAll ? root.querySelectorAll(sel) : [];
    nodes.forEach(el => {
      if (!shouldSkipElement(el)) {
        ATTRS.forEach(a => translateAttribute(el, a));
      }
    });
  }

  function translatePage() {
    if (!enabled) return;
    try { walkAndTranslate(document.body); } catch {}
  }

  let mo;
  function startObserver() {
    if (mo) return;
    mo = new MutationObserver((muts) => {
      if (!enabled) return;
      for (const mut of muts) {
        if (mut.type === "childList") {
          mut.addedNodes.forEach((n) => {
            if (n.nodeType === Node.TEXT_NODE) return;
            if (n.nodeType === Node.ELEMENT_NODE) walkAndTranslate(n);
          });
        } else if (mut.type === "characterData") {
          const n = mut.target;
          if (!isSkippableNode(n)) translateNodeValue(n);
        } else if (mut.type === "attributes") {
          const el = mut.target;
          if (shouldSkipElement(el)) continue;
          if (ATTRS.includes(mut.attributeName)) translateAttribute(el, mut.attributeName);
        }
      }
    });
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS
    });
  }
  function stopObserver() { if (mo) { mo.disconnect(); mo = null; } }

  // Badge + hotkeys
  let badge;
  function updateBadge() {
    if (!badge) return;
    const modeFlag = mode === "strict" ? "S" : "R";
    const actFlag = activityRelaxed ? "A" : "-";
    badge.textContent = enabled ? `EN ✅ ${modeFlag}/${actFlag}` : `EN ⛔ ${modeFlag}/${actFlag}`;
  }
  function injectBadge() {
    if (document.getElementById("towerim-translate-badge")) return;
    badge = document.createElement("div");
    badge.id = "towerim-translate-badge";
    Object.assign(badge.style, {
      position: "fixed",
      bottom: "10px",
      right: "10px",
      zIndex: 999999,
      background: "rgba(0,0,0,0.6)",
      color: "#fff",
      fontSize: "12px",
      padding: "4px 6px",
      borderRadius: "6px",
      cursor: "pointer",
      userSelect: "none"
    });
    badge.title = "Click: enable/disable | Alt+Shift+T: toggle on/off | Alt+Shift+M: Strict/Relaxed | Alt+Shift+A: Activity relaxed on/off";
    badge.addEventListener("click", () => {
      enabled = !enabled;
      saveEnabled(enabled);
      updateBadge();
      if (enabled) { translatePage(); startObserver(); } else { stopObserver(); }
    });
    updateBadge();
    document.documentElement.appendChild(badge);
  }

  function initHotkeys() {
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.shiftKey && e.code === "KeyT") {
        enabled = !enabled;
        saveEnabled(enabled);
        updateBadge();
        if (enabled) { translatePage(); startObserver(); } else { stopObserver(); }
      } else if (e.altKey && e.shiftKey && e.code === "KeyM") {
        mode = (mode === "strict") ? "relaxed" : "strict";
        saveMode(mode);
        updateBadge();
        if (enabled) translatePage();
      } else if (e.altKey && e.shiftKey && e.code === "KeyA") {
        activityRelaxed = !activityRelaxed;
        saveActivity(activityRelaxed);
        updateBadge();
        if (enabled) translatePage();
      }
    });
  }

  function init() {
    loadState(() => {
      if (enabled) { translatePage(); startObserver(); }
      injectBadge();
      initHotkeys();
    });
    setInterval(translateTitleTick, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
