import { useState } from 'react'
import './App.css'

const navItems = [['⌂', 'Home'], ['◈', 'Projects'], ['✓', 'Tasks'], ['◫', 'Meetings'], ['◌', 'Activity']]

const defaultMembers = [
  { id: 'm1', name: 'Shruti Mehta', role: 'Product Lead', avatar: 'S', color: 'purple' },
  { id: 'm2', name: 'Rahul Sharma', role: 'Frontend Dev', avatar: 'R', color: 'orange' },
  { id: 'm3', name: 'Priya Verma', role: 'UI/UX Lead', avatar: 'P', color: 'pink' },
  { id: 'm4', name: 'Aryan Kapoor', role: 'AI Researcher', avatar: 'A', color: 'teal' },
]

const initialProjects = [
  { 
    id: '1', 
    name: 'Smart Agriculture', 
    type: 'AI / ML', 
    description: 'Smart IoT campus infrastructure monitoring and AI crop health prediction platform.',
    progress: 68, 
    due: '28 Sep 2026', 
    dueDate: '2026-09-28',
    tone: 'blue', 
    members: [
      { name: 'Shruti Mehta', role: 'Product Lead', avatar: 'S', color: 'purple' },
      { name: 'Rahul Sharma', role: 'Frontend Dev', avatar: 'R', color: 'orange' },
      { name: 'Aryan Kapoor', role: 'AI Researcher', avatar: 'A', color: 'teal' },
    ] 
  },
  { 
    id: '2', 
    name: 'Expense Tracker', 
    type: 'Web app', 
    description: 'Budget management app for student shared expenses, reports, and bill splitting.',
    progress: 42, 
    due: '22 Sep 2026', 
    dueDate: '2026-09-22',
    tone: 'violet', 
    members: [
      { name: 'Shruti Mehta', role: 'Product Lead', avatar: 'S', color: 'purple' },
      { name: 'Rahul Sharma', role: 'Frontend Dev', avatar: 'R', color: 'orange' }
    ] 
  },
  { 
    id: '3', 
    name: 'Cybersecurity Lab', 
    type: 'Research', 
    description: 'Security assessment, threat vulnerability scanning, and team penetration testing dashboard.',
    progress: 84, 
    due: '30 Sep 2026', 
    dueDate: '2026-09-30',
    tone: 'green', 
    members: [
      { name: 'Priya Verma', role: 'Security Analyst', avatar: 'P', color: 'pink' },
      { name: 'Aryan Kapoor', role: 'Research Lead', avatar: 'A', color: 'teal' }
    ] 
  },
]

const initialTasks = [
  { 
    id: 't1', 
    title: 'Complete DBMS documentation', 
    projectId: '2',
    project: 'Expense Tracker', 
    time: 'Today, 6:00 PM', 
    dueDate: '2026-09-10',
    priority: 'High', 
    assignee: 'Shruti Mehta', 
    assigneeAvatar: 'S',
    done: false,
    comments: [
      { id: 'c1', author: 'Rahul Sharma', avatar: 'R', color: 'orange', time: '2 hours ago', text: 'Please check section 3 ER diagrams and include the relational schema.' }
    ]
  },
  { 
    id: 't2', 
    title: 'Push authentication module', 
    projectId: '1',
    project: 'Smart Agriculture', 
    time: 'Today, 8:30 PM', 
    dueDate: '2026-09-10',
    priority: 'High', 
    assignee: 'Rahul Sharma', 
    assigneeAvatar: 'R',
    done: false,
    comments: [
      { id: 'c2', author: 'Shruti Mehta', avatar: 'S', color: 'purple', time: '1 hour ago', text: 'JWT refresh token logic is tested and working properly.' }
    ]
  },
  { 
    id: 't3', 
    title: 'Review UI with team', 
    projectId: '3',
    project: 'Cybersecurity Lab', 
    time: 'Tomorrow, 5:00 PM', 
    dueDate: '2026-09-11',
    priority: 'Medium', 
    assignee: 'Priya Verma', 
    assigneeAvatar: 'P',
    done: false,
    comments: []
  },
  { 
    id: 't4', 
    title: 'Prepare project presentation', 
    projectId: '1',
    project: 'Smart Agriculture', 
    time: 'Completed', 
    dueDate: '2026-09-08',
    priority: 'Low', 
    assignee: 'Shruti Mehta', 
    assigneeAvatar: 'S',
    done: true,
    comments: []
  },
]

const initialMeetings = [
  {
    id: 'm1',
    title: 'Sprint Sync & Architecture Review',
    project: 'Smart Agriculture',
    host: 'Shruti Mehta (Product Lead)',
    hostAvatar: 'S',
    time: 'Today, 4:00 PM - 4:45 PM',
    dateLabel: 'Today',
    link: 'https://meet.google.com/abc-defg-hij',
    platform: 'Google Meet',
    status: 'Live Soon'
  },
  {
    id: 'm2',
    title: 'Database Schema & Relational Model Sync',
    project: 'Expense Tracker',
    host: 'Rahul Sharma',
    hostAvatar: 'R',
    time: 'Tomorrow, 6:00 PM - 6:30 PM',
    dateLabel: 'Tomorrow',
    link: 'https://meet.google.com/xyz-9876-mno',
    platform: 'Google Meet',
    status: 'Upcoming'
  }
]

function calculateDaysLeft(dueDateStr) {
  if (!dueDateStr) return 'N/A'
  const target = new Date(dueDateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffTime = target - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  if (isNaN(diffDays)) return '14 days left'
  if (diffDays < 0) return 'Overdue'
  if (diffDays === 0) return 'Due today'
  return `${diffDays} days left`
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return '30 Sep 2026'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function formatTimeDisplay(timeStr) {
  if (!timeStr) return '6:00 PM'
  const [hours, minutes] = timeStr.split(':')
  if (!hours) return timeStr
  let h = parseInt(hours, 10)
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${minutes || '00'} ${ampm}`
}

function App() {
  const [activeNav, setActiveNav] = useState('Home')
  const [projectsList, setProjectsList] = useState(initialProjects)
  const [tasks, setTasks] = useState(initialTasks)
  const [meetingsList, setMeetingsList] = useState(initialMeetings)
  const [filter, setFilter] = useState('All')
  
  // Modals & Selection
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false)
  const [isWorkspaceTaskModal, setIsWorkspaceTaskModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showAi, setShowAi] = useState(false)

  // Form State - Project
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectType, setNewProjectType] = useState('Web app')
  const [newProjectDesc, setNewProjectDesc] = useState('')
  const [newProjectDueDate, setNewProjectDueDate] = useState('2026-09-30')

  // Form State - Task (Date + Time)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskProject, setNewTaskProject] = useState('')
  const [newTaskAssignee, setNewTaskAssignee] = useState('Shruti Mehta')
  const [newTaskPriority, setNewTaskPriority] = useState('High')
  const [newTaskDayOption, setNewTaskDayOption] = useState('Today')
  const [newTaskCustomDate, setNewTaskCustomDate] = useState('2026-09-15')
  const [newTaskTime, setNewTaskTime] = useState('18:00')

  // Form State - Meeting (Link + Time)
  const [newMeetingTitle, setNewMeetingTitle] = useState('')
  const [newMeetingProject, setNewMeetingProject] = useState('')
  const [newMeetingLink, setNewMeetingLink] = useState('https://meet.google.com/')
  const [newMeetingDateOption, setNewMeetingDateOption] = useState('Today')
  const [newMeetingCustomDate, setNewMeetingCustomDate] = useState('2026-09-15')
  const [newMeetingTime, setNewMeetingTime] = useState('16:00')
  const [newMeetingDuration, setNewMeetingDuration] = useState('30 mins')

  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('Developer')

  const [newCommentText, setNewCommentText] = useState('')

  // Task Toggle
  const toggleTask = (taskId) => {
    setTasks((current) => current.map((task) => task.id === taskId ? { ...task, done: !task.done } : task))
  }

  // Create Project
  const handleCreateProject = (e) => {
    e.preventDefault()
    if (!newProjectName.trim()) return

    const tones = ['blue', 'violet', 'green']
    const randomTone = tones[Math.floor(Math.random() * tones.length)]
    const formattedDue = formatDateDisplay(newProjectDueDate)

    const newProj = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      type: newProjectType,
      description: newProjectDesc.trim() || 'Collaborative team project workspace.',
      progress: 0,
      due: formattedDue,
      dueDate: newProjectDueDate || '2026-09-30',
      tone: randomTone,
      members: [
        { name: 'Shruti Mehta', role: 'Product Lead', avatar: 'S', color: 'purple' },
        { name: 'Rahul Sharma', role: 'Frontend Dev', avatar: 'R', color: 'orange' }
      ]
    }

    setProjectsList([newProj, ...projectsList])
    setNewProjectName('')
    setNewProjectDesc('')
    setShowNewProjectModal(false)
    setSelectedProject(newProj)
  }

  // Create Task
  const handleCreateTask = (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const targetProjectName = isWorkspaceTaskModal && selectedProject ? selectedProject.name : (newTaskProject || projectsList[0]?.name || 'Smart Agriculture')
    const targetProjectId = projectsList.find(p => p.name === targetProjectName)?.id || '1'
    const avatarLetter = newTaskAssignee ? newTaskAssignee.charAt(0).toUpperCase() : 'S'

    let dayLabel = 'Today'
    if (newTaskDayOption === 'Tomorrow') {
      dayLabel = 'Tomorrow'
    } else if (newTaskDayOption === 'Custom') {
      dayLabel = formatDateDisplay(newTaskCustomDate)
    }

    const formattedTime = formatTimeDisplay(newTaskTime)
    const deadlineString = `${dayLabel}, ${formattedTime}`

    const newTaskObj = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      projectId: targetProjectId,
      project: targetProjectName,
      time: deadlineString,
      dueDate: newTaskCustomDate || '2026-09-15',
      priority: newTaskPriority,
      assignee: newTaskAssignee,
      assigneeAvatar: avatarLetter,
      done: false,
      comments: []
    }

    setTasks([newTaskObj, ...tasks])
    setNewTaskTitle('')
    setShowNewTaskModal(false)

    if (selectedProject) {
      setSelectedProject(prev => prev ? { ...prev } : null)
    }
  }

  // Schedule Meeting (Shared with Everyone)
  const handleScheduleMeeting = (e) => {
    e.preventDefault()
    if (!newMeetingTitle.trim() || !newMeetingLink.trim()) return

    const targetProjectName = newMeetingProject || selectedProject?.name || projectsList[0]?.name || 'Smart Agriculture'
    let dayLabel = 'Today'
    if (newMeetingDateOption === 'Tomorrow') {
      dayLabel = 'Tomorrow'
    } else if (newMeetingDateOption === 'Custom') {
      dayLabel = formatDateDisplay(newMeetingCustomDate)
    }

    const formattedTime = formatTimeDisplay(newMeetingTime)
    const timeDisplay = `${dayLabel}, ${formattedTime} (${newMeetingDuration})`

    let formattedLink = newMeetingLink.trim()
    if (!formattedLink.startsWith('http://') && !formattedLink.startsWith('https://')) {
      formattedLink = 'https://' + formattedLink
    }

    const platform = formattedLink.includes('zoom') ? 'Zoom' : formattedLink.includes('teams') ? 'MS Teams' : 'Google Meet'

    const newMeeting = {
      id: Date.now().toString(),
      title: newMeetingTitle.trim(),
      project: targetProjectName,
      host: 'Shruti Mehta (Product Lead)',
      hostAvatar: 'S',
      time: timeDisplay,
      dateLabel: dayLabel,
      link: formattedLink,
      platform: platform,
      status: 'Upcoming'
    }

    setMeetingsList([newMeeting, ...meetingsList])
    setNewMeetingTitle('')
    setShowNewMeetingModal(false)
    setActiveNav('Meetings')
  }

  // Add Team Member to Project
  const handleAddMember = (e) => {
    e.preventDefault()
    if (!newMemberName.trim() || !selectedProject) return

    const colors = ['purple', 'orange', 'pink', 'teal', 'blue']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newMem = {
      name: newMemberName.trim(),
      role: newMemberRole,
      avatar: newMemberName.trim().charAt(0).toUpperCase(),
      color: randomColor
    }

    const updatedProjects = projectsList.map(p => {
      if (p.id === selectedProject.id) {
        return { ...p, members: [...p.members, newMem] }
      }
      return p
    })

    setProjectsList(updatedProjects)
    setSelectedProject(prev => prev ? { ...prev, members: [...prev.members, newMem] } : null)
    setNewMemberName('')
    setShowAddMemberModal(false)
  }

  // Post Review / Comment on Task
  const handlePostComment = (e) => {
    e.preventDefault()
    if (!newCommentText.trim() || !selectedTask) return

    const newComment = {
      id: Date.now().toString(),
      author: 'Shruti Mehta (You)',
      avatar: 'S',
      color: 'purple',
      time: 'Just now',
      text: newCommentText.trim()
    }

    const updatedTasks = tasks.map(t => {
      if (t.id === selectedTask.id) {
        return { ...t, comments: [...t.comments, newComment] }
      }
      return t
    })

    setTasks(updatedTasks)
    setSelectedTask(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : null)
    setNewCommentText('')
  }

  const visibleProjects = filter === 'All' 
    ? projectsList 
    : projectsList.filter((project) => filter === 'Active' ? project.progress < 100 : filter === 'At Risk' ? project.progress < 50 : project.progress === 100)

  // Priority Rank Helper: High (1), Medium (2), Low (3)
  const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 }

  // ONLY LOGGED IN USER'S TASKS (Shruti Mehta / You), sorted by High priority first
  const myUserTasks = tasks
    .filter(task => task.assignee === 'Shruti Mehta' || task.assignee === 'You' || task.assignee.includes('Shruti'))
    .sort((a, b) => (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4))

  // Tasks inside a specific project workspace
  const projectTasks = selectedProject 
    ? tasks.filter(t => t.projectId === selectedProject.id || t.project === selectedProject.name) 
    : []

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">G</span>
          <span>groupify<span className="brand-dot">.</span></span>
        </div>
        <div className="workspace-switcher">
          <span className="workspace-icon">S</span>
          <span><strong>Study squad</strong><small>Engineering · 3rd year</small></span>
          <span className="chevron">⌄</span>
        </div>
        <nav className="main-nav">
          {navItems.map(([icon, label]) => (
            <button 
              className={activeNav === label ? 'nav-item active' : 'nav-item'} 
              key={label} 
              onClick={() => setActiveNav(label)}
            >
              <span>{icon}</span>{label}<em>{label === 'Tasks' ? myUserTasks.length : label === 'Projects' ? projectsList.length : label === 'Meetings' ? meetingsList.length : ''}</em>
            </button>
          ))}
        </nav>
        <div className="nav-label">WORKSPACE</div>
        <button className="nav-item"><span>▣</span>Files</button>
        <button 
          className={activeNav === 'Meetings' ? 'nav-item active' : 'nav-item'}
          onClick={() => setActiveNav('Meetings')}
        >
          <span>◫</span>Meetings <em>{meetingsList.length}</em>
        </button>
        <button className="nav-item"><span>⌘</span>GitHub</button>
        <div className="sidebar-bottom">
          <button className="nav-item"><span>⚙</span>Settings</button>
          <div className="profile-mini">
            <div className="avatar avatar-purple">S</div>
            <span><strong>Shruti Mehta</strong><small>View profile</small></span>
            <span>⋯</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span className="mobile-brand">G</span>
            <span>Workspace</span><b>/</b><strong>{activeNav}</strong>
          </div>
          <div className="top-actions">
            <button className="search-trigger">⌕ <span>Search anything...</span><kbd>⌘ K</kbd></button>
            <button className="icon-button notification">♢<i></i></button>
            <div className="avatar avatar-purple">S</div>
          </div>
        </header>

        <div className="content-wrap">
          {/* RENDER DEDICATED VIEW BASED ON ACTIVE NAV */}
          {activeNav === 'Projects' ? (
            /* DEDICATED PROJECTS PAGE - ONLY PROJECTS SHOWN! */
            <section className="projects-section" style={{ marginTop: '0', marginBottom: '40px' }}>
              <div className="panel-heading" style={{ marginBottom: '24px' }}>
                <div>
                  <div className="section-kicker">YOUR WORKSPACE</div>
                  <h2 style={{ fontSize: '28px', margin: '4px 0 2px' }}>Projects <span className="count-pill">{projectsList.length}</span></h2>
                  <p style={{ fontSize: '13px', color: '#687d98', margin: '0' }}>All active and completed team projects</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button className="primary-button" style={{ padding: '9px 16px', fontSize: '12px' }} onClick={() => setShowNewProjectModal(true)}>+ New Project</button>
                  <div className="filter-row">
                    {['All', 'Active', 'Completed', 'At Risk'].map((item) => (
                      <button 
                        className={filter === item ? 'filter-chip selected' : 'filter-chip'} 
                        onClick={() => setFilter(item)} 
                        key={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-grid">
                {visibleProjects.map((project) => (
                  <article 
                    className={`project-card ${project.tone}`} 
                    key={project.id || project.name}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="project-card-top">
                      <span className="project-symbol">{project.tone === 'blue' ? '⌁' : project.tone === 'violet' ? '◒' : '◉'}</span>
                      <span className="days-left-pill" style={{ fontSize: '9px', background: '#12253d', padding: '2px 7px', borderRadius: '10px', color: '#4cd39b', fontWeight: '700' }}>
                        {calculateDaysLeft(project.dueDate)}
                      </span>
                    </div>
                    <span className="project-type">{project.type}</span>
                    <h3>{project.name}</h3>
                    <div className="progress-meta">
                      <span>Progress</span>
                      <strong>{project.progress}%</strong>
                    </div>
                    <div className="progress-track">
                      <span style={{ width: `${project.progress}%` }}></span>
                    </div>
                    <div className="project-footer">
                      <div className="avatar-stack">
                        {project.members.map((member, index) => (
                          <span className={`avatar avatar-${member.color || ['orange', 'pink', 'teal', 'blue'][index % 4]}`} key={index} title={`${member.name} (${member.role})`}>
                            {member.avatar || member.name.charAt(0)}
                          </span>
                        ))}
                      </div>
                      <span>⌁ {tasks.filter(t => t.projectId === project.id || t.project === project.name).length} tasks</span>
                      <span>◷ {project.due}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : activeNav === 'Tasks' ? (
            /* DEDICATED TASKS PAGE */
            <section className="panel" style={{ background: '#0a1424', marginBottom: '40px' }}>
              <div className="panel-heading">
                <div>
                  <div className="section-kicker">PERSONAL DASHBOARD</div>
                  <h2 style={{ fontSize: '26px', margin: '4px 0 2px' }}>Your tasks ({myUserTasks.length})</h2>
                  <p style={{ fontSize: '12px', color: '#687d98', margin: '0' }}>Filtered to your account (Shruti Mehta) · Sorted by High Priority first</p>
                </div>
                <button 
                  className="primary-button" 
                  onClick={() => {
                    setIsWorkspaceTaskModal(false)
                    setNewTaskProject(projectsList[0]?.name || '')
                    setShowNewTaskModal(true)
                  }}
                >
                  + Add task
                </button>
              </div>

              <div className="task-list">
                {myUserTasks.length === 0 ? (
                  <p style={{ color: '#687c97', fontSize: '12px', textAlign: 'center', padding: '20px 0' }}>No tasks assigned to you currently.</p>
                ) : (
                  myUserTasks.map((task) => (
                    <div className={task.done ? 'task-row done' : 'task-row'} key={task.id} onClick={() => setSelectedTask(task)}>
                      <button className="task-check" onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}>{task.done ? '✓' : ''}</button>
                      <div className="task-detail">
                        <strong>{task.title}</strong>
                        <span>
                          <b className={`priority-dot ${task.priority.toLowerCase()}`}></b>
                          {task.project} <i>·</i> Assigned to: <strong>{task.assignee}</strong> 
                          {task.comments?.length > 0 && <small style={{ color: '#6fbaff', marginLeft: '6px' }}>💬 {task.comments.length}</small>}
                        </span>
                      </div>
                      <div className="task-time">
                        <strong>{task.time}</strong>
                        <span className={`priority-text ${task.priority.toLowerCase()}`}>{task.priority} Priority</span>
                      </div>
                      <span className="task-arrow">→</span>
                    </div>
                  ))
                )}
              </div>
            </section>
          ) : activeNav === 'Meetings' ? (
            /* DEDICATED MEETINGS PAGE - VISIBLE TO EVERYONE! */
            <section className="panel" style={{ background: '#0a1424', marginBottom: '40px' }}>
              <div className="panel-heading" style={{ marginBottom: '24px' }}>
                <div>
                  <div className="section-kicker">TEAM SYNCS & LIVE CALLS</div>
                  <h2 style={{ fontSize: '28px', margin: '4px 0 2px' }}>Team Meetings <span className="count-pill">{meetingsList.length}</span></h2>
                  <p style={{ fontSize: '13px', color: '#687d98', margin: '0' }}>Shared meeting links visible to all workspace team members</p>
                </div>
                <button 
                  className="primary-button" 
                  style={{ padding: '9px 16px', fontSize: '12px' }}
                  onClick={() => setShowNewMeetingModal(true)}
                >
                  + Schedule Meeting
                </button>
              </div>

              <div style={{ display: 'grid', gap: '16px' }}>
                {meetingsList.length === 0 ? (
                  <p style={{ color: '#687c97', fontSize: '13px', textAlign: 'center', padding: '30px 0' }}>
                    No meetings scheduled yet. Click "+ Schedule Meeting" to add a Google Meet or Zoom link for the team!
                  </p>
                ) : (
                  meetingsList.map((m) => (
                    <div 
                      key={m.id} 
                      style={{
                        padding: '20px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #0e1e35, #0a1322)',
                        border: '1px solid #1e385c',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        boxShadow: '0 4px 20px #0004'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div 
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '12px',
                            background: '#163354',
                            border: '1px solid #28548a',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: '22px',
                            color: '#55e0e6',
                            flex: 'none'
                          }}
                        >
                          🎥
                        </div>
                        <div style={{ display: 'grid', gap: '4px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <strong style={{ fontSize: '16px', color: '#fff' }}>{m.title}</strong>
                            <span style={{ fontSize: '9px', background: '#19395e', color: '#6fcbf4', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{m.project}</span>
                            <span style={{ fontSize: '9px', background: '#194236', color: '#4cd39b', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{m.platform}</span>
                          </div>
                          <span style={{ fontSize: '12px', color: '#879bb6' }}>
                            Hosted by <strong>{m.host}</strong> · 🕒 {m.time}
                          </span>
                          <a 
                            href={m.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ fontSize: '11px', color: '#4c9fff', textDecoration: 'none', wordBreak: 'break-all', marginTop: '2px' }}
                          >
                            🔗 {m.link}
                          </a>
                        </div>
                      </div>

                      <a 
                        href={m.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="primary-button" 
                        style={{ padding: '10px 18px', fontSize: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        Join Meeting ↗
                      </a>
                    </div>
                  ))
                )}
              </div>
            </section>
          ) : activeNav === 'Activity' ? (
            /* DEDICATED TEAM ACTIVITY PAGE */
            <section className="panel" style={{ background: '#0a1424', marginBottom: '40px' }}>
              <div className="panel-heading">
                <div>
                  <div className="section-kicker">TEAM PULSE & AUDIT LOG</div>
                  <h2 style={{ fontSize: '26px', margin: '4px 0 2px' }}>Team Activity Stream</h2>
                  <p style={{ fontSize: '12px', color: '#687d98', margin: '0' }}>Real-time updates across all workspace projects</p>
                </div>
              </div>
              <div className="activity-list" style={{ marginTop: '15px' }}>
                <div className="activity-item" style={{ padding: '12px 0', borderBottom: '1px solid #162438' }}>
                  <div className="avatar avatar-orange">R</div>
                  <div><p><strong>Rahul Sharma</strong> pushed 3 commits to <b>authentication-fix</b></p><span>12 minutes ago · Smart Agriculture</span></div>
                </div>
                <div className="activity-item" style={{ padding: '12px 0', borderBottom: '1px solid #162438' }}>
                  <div className="avatar avatar-pink">P</div>
                  <div><p><strong>Priya Verma</strong> completed task <b>Dashboard UI Mockups</b></p><span>38 minutes ago · Cybersecurity Lab</span></div>
                </div>
                <div className="activity-item" style={{ padding: '12px 0', borderBottom: '1px solid #162438' }}>
                  <div className="avatar avatar-teal">A</div>
                  <div><p><strong>Aryan Kapoor</strong> uploaded file <b>research-notes-v2.pdf</b></p><span>1 hour ago · Smart Agriculture</span></div>
                </div>
                <div className="activity-item" style={{ padding: '12px 0' }}>
                  <div className="avatar avatar-purple">S</div>
                  <div><p><strong>Shruti Mehta</strong> created project <b>Mitro ML Pipeline</b></p><span>2 hours ago · Machine Learning</span></div>
                </div>
              </div>
            </section>
          ) : (
            /* DEFAULT HOME DASHBOARD PAGE */
            <>
              <section className="welcome-row">
                <div>
                  <p className="eyebrow">MONDAY, SEPTEMBER 7, 2026</p>
                  <h1>Good evening, Shruti <span>✦</span></h1>
                  <p className="subhead">Here’s what needs your attention.</p>
                </div>
                <button className="primary-button" onClick={() => setShowQuickAdd(true)}>
                  <span>+</span> Create new
                </button>
              </section>

              <section className="stats-grid">
                {[
                  ['◈', projectsList.length, 'Projects', '2 at risk'], 
                  ['✓', myUserTasks.filter(t => !t.done).length, 'Your open tasks', 'Sorted by priority'], 
                  ['◷', '18h', 'This week', '↑ 12% from last week'], 
                  ['✦', '82%', 'Team health', 'Looking good']
                ].map(([icon, value, label, note]) => (
                  <div className="stat-card" key={label}>
                    <div className="stat-icon">{icon}</div>
                    <div><strong>{value}</strong><span>{label}</span><small>{note}</small></div>
                  </div>
                ))}
              </section>

              <section className="ai-priority">
                <div className="ai-orb">✦</div>
                <div className="ai-copy">
                  <div className="section-kicker">AI PRIORITY <span className="live-dot">●</span></div>
                  <h2>Your next best move</h2>
                  <p>You have {myUserTasks.filter(t => !t.done).length} open tasks. <strong>{myUserTasks[0]?.title || 'Smart Agriculture'}</strong> needs attention first because of its High priority tag.</p>
                  <div className="ai-actions">
                    <button onClick={() => setShowAi(true)}>View priorities <span>→</span></button>
                    <button className="ghost-button" onClick={() => setShowAi(true)}>Ask AI <span>↗</span></button>
                  </div>
                </div>
                <div className="priority-ring">
                  <strong>45</strong><span>doc progress</span>
                </div>
              </section>

              <div className="dashboard-grid">
                {/* YOUR TASKS PANEL */}
                <section className="panel tasks-panel">
                  <div className="panel-heading">
                    <div>
                      <div className="section-kicker">YOUR FOCUS</div>
                      <h2>Your tasks <span className="count-pill">{myUserTasks.filter((task) => !task.done).length}</span></h2>
                    </div>
                    <button 
                      className="text-button" 
                      onClick={() => { 
                        setIsWorkspaceTaskModal(false)
                        setNewTaskProject(projectsList[0]?.name || '')
                        setShowNewTaskModal(true) 
                      }}
                    >
                      + Add task
                    </button>
                  </div>

                  <div className="task-list">
                    {myUserTasks.length === 0 ? (
                      <p style={{ color: '#687c97', fontSize: '12px', padding: '15px 0' }}>No tasks assigned to your account.</p>
                    ) : (
                      myUserTasks.map((task) => (
                        <div className={task.done ? 'task-row done' : 'task-row'} key={task.id} onClick={() => setSelectedTask(task)}>
                          <button className="task-check" onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}>{task.done ? '✓' : ''}</button>
                          <div className="task-detail">
                            <strong>{task.title}</strong>
                            <span>
                              <b className={`priority-dot ${task.priority.toLowerCase()}`}></b>
                              {task.project} <i>·</i> {task.assignee} 
                              {task.comments?.length > 0 && <small style={{ color: '#6fbaff', marginLeft: '6px' }}>💬 {task.comments.length}</small>}
                            </span>
                          </div>
                          <div className="task-time">
                            <strong>{task.time}</strong>
                            <span className={`priority-text ${task.priority.toLowerCase()}`}>{task.priority}</span>
                          </div>
                          <span className="task-arrow">→</span>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                <section className="panel activity-panel">
                  <div className="panel-heading">
                    <div>
                      <div className="section-kicker">LIVE PULSE</div>
                      <h2>Team activity</h2>
                    </div>
                    <button className="more-button">•••</button>
                  </div>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="avatar avatar-orange">R</div>
                      <div><p><strong>Rahul</strong> pushed code to <b>authentication-fix</b></p><span>12 minutes ago · Smart Agriculture</span></div>
                    </div>
                    <div className="activity-item">
                      <div className="avatar avatar-pink">P</div>
                      <div><p><strong>Priya</strong> completed <b>Dashboard UI</b></p><span>38 minutes ago · Cybersecurity Lab</span></div>
                    </div>
                    <div className="activity-item">
                      <div className="avatar avatar-teal">A</div>
                      <div><p><strong>Aryan</strong> uploaded <b>research-notes.pdf</b></p><span>1 hour ago · Smart Agriculture</span></div>
                    </div>
                  </div>
                  <div className="team-status">
                    <div className="status-avatars">
                      <span className="avatar avatar-orange">R</span>
                      <span className="avatar avatar-pink">P</span>
                      <span className="avatar avatar-teal">A</span>
                      <span className="avatar avatar-blue">N</span>
                    </div>
                    <span><b>4 members</b> active now</span>
                    <i className="green-pulse"></i>
                  </div>
                </section>
              </div>

              {/* PROJECTS QUICK OVERVIEW ON HOME PAGE */}
              <section className="projects-section">
                <div className="panel-heading">
                  <div>
                    <div className="section-kicker">YOUR SPACE</div>
                    <h2>Projects <span className="count-pill">{projectsList.length}</span></h2>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button className="text-button" onClick={() => setActiveNav('Projects')}>View all →</button>
                    <button className="primary-button" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => setShowNewProjectModal(true)}>+ New Project</button>
                  </div>
                </div>

                <div className="project-grid">
                  {visibleProjects.slice(0, 3).map((project) => (
                    <article 
                      className={`project-card ${project.tone}`} 
                      key={project.id || project.name}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="project-card-top">
                        <span className="project-symbol">{project.tone === 'blue' ? '⌁' : project.tone === 'violet' ? '◒' : '◉'}</span>
                        <span className="days-left-pill" style={{ fontSize: '9px', background: '#12253d', padding: '2px 7px', borderRadius: '10px', color: '#4cd39b', fontWeight: '700' }}>
                          {calculateDaysLeft(project.dueDate)}
                        </span>
                      </div>
                      <span className="project-type">{project.type}</span>
                      <h3>{project.name}</h3>
                      <div className="progress-meta">
                        <span>Progress</span>
                        <strong>{project.progress}%</strong>
                      </div>
                      <div className="progress-track">
                        <span style={{ width: `${project.progress}%` }}></span>
                      </div>
                      <div className="project-footer">
                        <div className="avatar-stack">
                          {project.members.map((member, index) => (
                            <span className={`avatar avatar-${member.color || ['orange', 'pink', 'teal', 'blue'][index % 4]}`} key={index} title={`${member.name} (${member.role})`}>
                              {member.avatar || member.name.charAt(0)}
                            </span>
                          ))}
                        </div>
                        <span>⌁ {tasks.filter(t => t.projectId === project.id || t.project === project.name).length} tasks</span>
                        <span>◷ {project.due}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}

          <div className="bottom-space"></div>
        </div>
      </main>

      <button className="ai-fab" onClick={() => setShowAi(true)}><span>✦</span><i></i></button>

      <nav className="mobile-nav">
        {navItems.slice(0, 4).map(([icon, label]) => (
          <button className={activeNav === label ? 'active' : ''} key={label} onClick={() => setActiveNav(label)}>
            <span>{icon}</span>{label}
          </button>
        ))}
        <button onClick={() => setShowQuickAdd(true)}><span className="mobile-add">+</span>Create</button>
      </nav>

      {/* SCHEDULE MEETING MODAL */}
      {showNewMeetingModal && (
        <div className="modal-backdrop" onClick={() => setShowNewMeetingModal(false)}>
          <div className="quick-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-handle"></div>
            <div className="section-kicker">SCHEDULE MEETING</div>
            <h2>Schedule Team Call & Add Link</h2>
            <form onSubmit={handleScheduleMeeting} style={{ display: 'grid', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>MEETING TITLE</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sprint Review & Architecture Sync" 
                  value={newMeetingTitle}
                  onChange={(e) => setNewMeetingTitle(e.target.value)}
                  autoFocus
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>MEETING LINK (GOOGLE MEET / ZOOM)</label>
                <input 
                  type="text" 
                  placeholder="e.g. https://meet.google.com/abc-defg-hij" 
                  value={newMeetingLink}
                  onChange={(e) => setNewMeetingLink(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>PROJECT</label>
                  <select
                    value={newMeetingProject}
                    onChange={(e) => setNewMeetingProject(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                  >
                    {projectsList.map(p => (
                      <option key={p.id || p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>DURATION</label>
                  <select
                    value={newMeetingDuration}
                    onChange={(e) => setNewMeetingDuration(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="30 mins">30 mins</option>
                    <option value="45 mins">45 mins</option>
                    <option value="1 hour">1 hour</option>
                    <option value="1.5 hours">1.5 hours</option>
                  </select>
                </div>
              </div>

              {/* DATE & TIME SELECTOR */}
              <div style={{ border: '1px solid #1c3352', borderRadius: '12px', padding: '14px', background: '#091324' }}>
                <label style={{ fontSize: '10px', color: '#7697bf', display: 'block', marginBottom: '8px', fontWeight: 'bold', letterSpacing: '1px' }}>
                  MEETING DATE & TIME
                </label>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '9px', color: '#687c97', display: 'block', marginBottom: '3px' }}>MEETING DATE</label>
                    <select
                      value={newMeetingDateOption}
                      onChange={(e) => setNewMeetingDateOption(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #294365', background: '#0c1a2d', color: '#fff', fontSize: '13px', outline: 'none', marginBottom: newMeetingDateOption === 'Custom' ? '8px' : '0' }}
                    >
                      <option value="Today">Today</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Custom">Custom Date...</option>
                    </select>

                    {newMeetingDateOption === 'Custom' && (
                      <input 
                        type="date"
                        value={newMeetingCustomDate}
                        onChange={(e) => setNewMeetingCustomDate(e.target.value)}
                        style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #294365', background: '#0c1a2d', color: '#fff', fontSize: '13px', outline: 'none' }}
                      />
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize: '9px', color: '#687c97', display: 'block', marginBottom: '3px' }}>START TIME</label>
                    <input 
                      type="time"
                      value={newMeetingTime}
                      onChange={(e) => setNewMeetingTime(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #294365', background: '#0c1a2d', color: '#fff', fontSize: '13px', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" className="ghost-button" style={{ padding: '10px 16px', color: '#91a3bb', background: 'none', border: 0, cursor: 'pointer' }} onClick={() => setShowNewMeetingModal(false)}>Cancel</button>
                <button type="submit" className="primary-button">Publish Meeting Link</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT WORKSPACE MODAL */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="workspace-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="workspace-header">
              <div className="workspace-title-row">
                <span className="section-kicker">PROJECT WORKSPACE · {selectedProject.type}</span>
                <h2>{selectedProject.name}</h2>
                <p>{selectedProject.description}</p>
              </div>
              <div className="deadline-badge">
                <span>🗓 Target Deadline: <strong>{selectedProject.due}</strong></span>
                <span className="days-left">({calculateDaysLeft(selectedProject.dueDate)})</span>
              </div>
            </div>

            <div className="workspace-stats">
              <div className="w-stat-card">
                <label>PROGRESS</label>
                <strong>{selectedProject.progress}%</strong>
                <div className="progress-track" style={{ marginTop: '5px' }}>
                  <span style={{ width: `${selectedProject.progress}%` }}></span>
                </div>
              </div>
              <div className="w-stat-card">
                <label>TOTAL TASKS</label>
                <strong>{projectTasks.length} tasks</strong>
                <span style={{ fontSize: '10px', color: '#687d98' }}>{projectTasks.filter(t => t.done).length} completed</span>
              </div>
              <div className="w-stat-card">
                <label>TEAM MEMBERS</label>
                <strong>{selectedProject.members.length} members</strong>
                <span style={{ fontSize: '10px', color: '#4cd39b' }}>● Active workspace</span>
              </div>
            </div>

            {/* TEAM MEMBERS LIST */}
            <div className="members-section">
              <div className="members-header">
                <h4>PROJECT TEAM MEMBERS</h4>
                <button className="add-member-btn" onClick={() => setShowAddMemberModal(true)}>+ Add Member</button>
              </div>
              <div className="members-grid">
                {selectedProject.members.map((member, i) => (
                  <div className="member-chip" key={i}>
                    <div className={`avatar avatar-${member.color || 'purple'}`} style={{ width: '22px', height: '22px', fontSize: '9px' }}>
                      {member.avatar || member.name.charAt(0)}
                    </div>
                    <div>
                      <strong>{member.name}</strong>
                      <span style={{ display: 'block', fontSize: '9px', color: '#7b90ab' }}>{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TASKS IN WORKSPACE */}
            <div className="panel" style={{ background: '#0a1424' }}>
              <div className="panel-heading">
                <div>
                  <div className="section-kicker">PROJECT TASKS</div>
                  <h2>Tasks ({projectTasks.length})</h2>
                </div>
                <button 
                  className="primary-button" 
                  style={{ padding: '8px 14px', fontSize: '11px' }}
                  onClick={() => {
                    setIsWorkspaceTaskModal(true)
                    setNewTaskProject(selectedProject.name)
                    setShowNewTaskModal(true)
                  }}
                >
                  + Create Task
                </button>
              </div>

              <div className="task-list">
                {projectTasks.length === 0 ? (
                  <p style={{ color: '#687c97', fontSize: '12px', textAlign: 'center', padding: '20px 0' }}>
                    No tasks created for this project yet. Click "+ Create Task" to assign work!
                  </p>
                ) : (
                  projectTasks.map((task) => (
                    <div 
                      className={task.done ? 'task-row done' : 'task-row'} 
                      key={task.id} 
                      onClick={() => setSelectedTask(task)}
                    >
                      <button className="task-check" onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}>{task.done ? '✓' : ''}</button>
                      <div className="task-detail">
                        <strong>{task.title}</strong>
                        <span>
                          <b className={`priority-dot ${task.priority.toLowerCase()}`}></b>
                          Assigned to: <strong>{task.assignee}</strong> <i>·</i> {task.time} 
                          {task.comments?.length > 0 && <small style={{ color: '#6fbaff', marginLeft: '8px' }}>💬 {task.comments.length} review(s)</small>}
                        </span>
                      </div>
                      <div className="task-time">
                        <span className={`priority-text ${task.priority.toLowerCase()}`}>{task.priority} Priority</span>
                      </div>
                      <span className="task-arrow">→</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button className="primary-button" style={{ background: '#1c3455' }} onClick={() => setSelectedProject(null)}>Close Workspace</button>
            </div>
          </div>
        </div>
      )}

      {/* TASK REVIEWS & COMMENTS MODAL */}
      {selectedTask && (
        <div className="modal-backdrop" onClick={() => setSelectedTask(null)}>
          <div className="workspace-sheet" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="workspace-header">
              <div>
                <span className="section-kicker">TASK REVIEW & DETAILS · {selectedTask.project}</span>
                <h2 style={{ fontSize: '20px', margin: '4px 0' }}>{selectedTask.title}</h2>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '6px', fontSize: '12px', color: '#8aa1be' }}>
                  <span>Assigned to: <strong style={{ color: '#fff' }}>{selectedTask.assignee}</strong></span>
                  <span>·</span>
                  <span className={`priority-text ${selectedTask.priority.toLowerCase()}`}>{selectedTask.priority} Priority</span>
                  <span>·</span>
                  <span>Due: <strong>{selectedTask.time}</strong></span>
                </div>
              </div>
              <button className="close-button" onClick={() => setSelectedTask(null)}>×</button>
            </div>

            <div style={{ margin: '14px 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button 
                className="primary-button" 
                style={{ background: selectedTask.done ? '#287e85' : '#438cf4', padding: '8px 14px', fontSize: '11px' }}
                onClick={() => toggleTask(selectedTask.id)}
              >
                {selectedTask.done ? '✓ Completed (Click to Reopen)' : 'Mark as Complete'}
              </button>
            </div>

            {/* COMMENTS / REVIEWS FEED */}
            <div style={{ marginTop: '20px' }}>
              <div className="section-kicker">TEAM REVIEWS & COMMENTS ({selectedTask.comments?.length || 0})</div>
              
              <div className="comments-feed">
                {(!selectedTask.comments || selectedTask.comments.length === 0) ? (
                  <p style={{ color: '#627690', fontSize: '12px', fontStyle: 'italic', margin: '10px 0' }}>
                    No reviews or comments yet. Add a review comment below for {selectedTask.assignee}!
                  </p>
                ) : (
                  selectedTask.comments.map((c) => (
                    <div className="comment-bubble" key={c.id}>
                      <div className={`avatar avatar-${c.color || 'purple'}`} style={{ width: '26px', height: '26px', fontSize: '10px' }}>
                        {c.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div>
                          <strong>{c.author}</strong>
                          <small>{c.time}</small>
                        </div>
                        <p>{c.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handlePostComment} className="comment-input-row">
                <input 
                  type="text" 
                  placeholder={`Write a review for ${selectedTask.assignee}...`} 
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button type="submit" className="primary-button" style={{ padding: '10px 16px', fontSize: '11px' }}>Post Review</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {showAddMemberModal && (
        <div className="modal-backdrop" onClick={() => setShowAddMemberModal(false)}>
          <div className="quick-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle"></div>
            <div className="section-kicker">ADD TEAM MEMBER</div>
            <h2>Assign member to {selectedProject?.name}</h2>
            <form onSubmit={handleAddMember} style={{ display: 'grid', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="Member name (e.g. Neha Gupta)" 
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                autoFocus
                style={{ padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
              />
              <select
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value)}
                style={{ padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
              >
                <option value="Frontend Dev">Frontend Dev</option>
                <option value="Backend Dev">Backend Dev</option>
                <option value="AI Research">AI Research</option>
                <option value="UI/UX Lead">UI/UX Lead</option>
                <option value="Documentation">Documentation</option>
                <option value="Security Analyst">Security Analyst</option>
              </select>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" className="ghost-button" style={{ padding: '10px 16px', color: '#91a3bb', background: 'none', border: 0, cursor: 'pointer' }} onClick={() => setShowAddMemberModal(false)}>Cancel</button>
                <button type="submit" className="primary-button">Add to Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK ADD MODAL */}
      {showQuickAdd && (
        <div className="modal-backdrop" onClick={() => setShowQuickAdd(false)}>
          <div className="quick-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-handle"></div>
            <div className="section-kicker">QUICK ADD</div>
            <h2>What are we building?</h2>
            <div className="quick-grid">
              <button onClick={() => { 
                setShowQuickAdd(false); 
                setIsWorkspaceTaskModal(false);
                setNewTaskProject(projectsList[0]?.name || ''); 
                setShowNewTaskModal(true); 
              }}>
                <span>＋</span>New task
              </button>
              <button onClick={() => { setShowQuickAdd(false); setShowNewProjectModal(true); }}>
                <span>◈</span>New project
              </button>
              <button onClick={() => { setShowQuickAdd(false); setShowNewMeetingModal(true); }}>
                <span>◷</span>Schedule meeting
              </button>
              <button onClick={() => setShowQuickAdd(false)}>
                <span>□</span>Add note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW PROJECT MODAL */}
      {showNewProjectModal && (
        <div className="modal-backdrop" onClick={() => setShowNewProjectModal(false)}>
          <div className="quick-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-handle"></div>
            <div className="section-kicker">NEW PROJECT</div>
            <h2>Create New Project</h2>
            <form onSubmit={handleCreateProject} style={{ display: 'grid', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>PROJECT NAME</label>
                <input 
                  type="text" 
                  placeholder="e.g. Parampara v2" 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  autoFocus
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>PROJECT DESCRIPTION</label>
                <input 
                  type="text" 
                  placeholder="Short description..." 
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>CATEGORY</label>
                  <select
                    value={newProjectType}
                    onChange={(e) => setNewProjectType(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="Web app">Web app</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="Research">Research</option>
                    <option value="College">College</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>PROJECT DEADLINE (DATE)</label>
                  <input 
                    type="date"
                    value={newProjectDueDate}
                    onChange={(e) => setNewProjectDueDate(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" className="ghost-button" style={{ padding: '10px 16px', color: '#91a3bb', background: 'none', border: 0, cursor: 'pointer' }} onClick={() => setShowNewProjectModal(false)}>Cancel</button>
                <button type="submit" className="primary-button">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW TASK MODAL */}
      {showNewTaskModal && (
        <div className="modal-backdrop" onClick={() => setShowNewTaskModal(false)}>
          <div className="quick-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-handle"></div>
            <div className="section-kicker">NEW TASK</div>
            <h2>Create & Assign Task</h2>
            <form onSubmit={handleCreateTask} style={{ display: 'grid', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>TASK TITLE</label>
                <input 
                  type="text" 
                  placeholder="Task title..." 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  autoFocus
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>

              {/* CONTEXT-AWARE PROJECT SELECTION */}
              {isWorkspaceTaskModal && selectedProject ? (
                <div style={{ background: '#12253e', padding: '10px 14px', borderRadius: '9px', border: '1px solid #244671' }}>
                  <span style={{ fontSize: '9px', color: '#688bb7', display: 'block', fontWeight: 'bold' }}>PROJECT CONTEXT</span>
                  <strong style={{ color: '#55e0e6', fontSize: '14px' }}>◈ {selectedProject.name}</strong>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>SELECT PROJECT</label>
                  <select
                    value={newTaskProject}
                    onChange={(e) => setNewTaskProject(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                  >
                    {projectsList.map(p => (
                      <option key={p.id || p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* ASSIGNEE SELECTOR */}
              <div>
                <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>ASSIGN TO MEMBER</label>
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                >
                  <option value="Shruti Mehta">Myself (Shruti Mehta - Product Lead)</option>
                  {(selectedProject?.members || defaultMembers).map((m, idx) => (
                    <option key={idx} value={m.name}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              {/* TASK DEADLINE: DATE WITH TIME PICKER */}
              <div style={{ border: '1px solid #1c3352', borderRadius: '12px', padding: '14px', background: '#091324' }}>
                <label style={{ fontSize: '10px', color: '#7697bf', display: 'block', marginBottom: '8px', fontWeight: 'bold', letterSpacing: '1px' }}>
                  TASK DEADLINE (DATE WITH TIME)
                </label>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '9px', color: '#687c97', display: 'block', marginBottom: '3px' }}>DEADLINE DATE</label>
                    <select
                      value={newTaskDayOption}
                      onChange={(e) => setNewTaskDayOption(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #294365', background: '#0c1a2d', color: '#fff', fontSize: '13px', outline: 'none', marginBottom: newTaskDayOption === 'Custom' ? '8px' : '0' }}
                    >
                      <option value="Today">Today</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Custom">Custom Date...</option>
                    </select>

                    {newTaskDayOption === 'Custom' && (
                      <input 
                        type="date"
                        value={newTaskCustomDate}
                        onChange={(e) => setNewTaskCustomDate(e.target.value)}
                        style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #294365', background: '#0c1a2d', color: '#fff', fontSize: '13px', outline: 'none' }}
                      />
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize: '9px', color: '#687c97', display: 'block', marginBottom: '3px' }}>DEADLINE TIME</label>
                    <input 
                      type="time"
                      value={newTaskTime}
                      onChange={(e) => setNewTaskTime(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #294365', background: '#0c1a2d', color: '#fff', fontSize: '13px', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '10px', color: '#778ca7', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>PRIORITY LEVEL</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid #294365', background: '#091322', color: '#fff', fontSize: '14px', outline: 'none' }}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" className="ghost-button" style={{ padding: '10px 16px', color: '#91a3bb', background: 'none', border: 0, cursor: 'pointer' }} onClick={() => setShowNewTaskModal(false)}>Cancel</button>
                <button type="submit" className="primary-button">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI DRAWER */}
      {showAi && (
        <div className="modal-backdrop" onClick={() => setShowAi(false)}>
          <div className="ai-drawer" onClick={(event) => event.stopPropagation()}>
            <button className="close-button" onClick={() => setShowAi(false)}>×</button>
            <div className="ai-drawer-heading">
              <div className="ai-orb small">✦</div>
              <div>
                <div className="section-kicker">GROUPIFY AI</div>
                <h2>Ask your project</h2>
              </div>
            </div>
            <p className="ai-intro">I’ve read through your project context. What would you like to figure out?</p>
            <div className="prompt-list">
              {['What should I work on next?', 'What is blocking our progress?', 'Summarize this project'].map((prompt) => (
                <button key={prompt} onClick={() => setShowAi(false)}>{prompt}<span>↗</span></button>
              ))}
            </div>
            <div className="ai-input">Ask anything about your workspace... <span>↑</span></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
