# Task Manager

A comprehensive task management application built with modern web technologies.

## Features

- ✅ **Task Creation & Management**: Create, edit, and delete tasks with ease
- ✅ **Priority System**: Assign priority levels to tasks (Low, Medium, High)
- ✅ **Due Dates**: Set deadlines for tasks and get reminders
- ✅ **Task Categories**: Organize tasks into custom categories
- ✅ **Search & Filter**: Quickly find tasks using search and filter options
- ✅ **Progress Tracking**: Monitor completion rates and productivity metrics
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Dark Mode**: Switch between light and dark themes
- ✅ **Local Storage**: Data persists in browser localStorage
- ✅ **Export/Import**: Backup and restore your task data

## Tech Stack

### Frontend
- **React 18**: Component-based UI framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **React Query**: Server state management
- **Local Storage**: Client-side data persistence

### Backend (Optional)
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **JWT**: Authentication tokens
- **Socket.io**: Real-time updates

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Unit testing
- **Vite**: Build tool and dev server

## Project Structure

```
task-manager/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript definitions
│   ├── store/           # State management
│   ├── styles/          # Global styles
│   └── tests/           # Test files
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Muhammad-Husnain07/Task-Manager.git
   cd task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Usage

### Creating Tasks
1. Click the "+ New Task" button
2. Fill in task details (title, description, priority, due date)
3. Assign to a category or create a new one
4. Click "Save" to add the task

### Managing Tasks
- **Edit**: Click on a task to edit its details
- **Complete**: Check the checkbox to mark as complete
- **Delete**: Click the delete icon to remove a task
- **Priority**: Change priority using the dropdown
- **Due Date**: Update deadlines as needed

### Filtering & Searching
- Use the search bar to find tasks by title or description
- Filter by priority, category, or completion status
- Sort tasks by due date, priority, or creation date

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
VITE_APP_TITLE=Task Manager
VITE_APP_API_URL=http://localhost:3000
```

### Customizing Themes

Modify theme colors in `src/styles/theme.css`:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow Prettier formatting (run `npm run format`)
- Use ESLint for code quality
- Write tests for new features
- Keep components small and focused

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Email: muhammad.husnain.dev@gmail.com
- Documentation: [Wiki](https://github.com/Muhammad-Husnain07/Task-Manager/wiki)

## Acknowledgments

- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Vite](https://vitejs.dev/) - Build tool
- [Heroicons](https://heroicons.com/) - Icon library

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.
