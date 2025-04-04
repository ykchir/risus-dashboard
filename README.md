# RISUS Dashboard

A modern web dashboard for dental practitioners using RISUS aligners. This application allows dental practitioners to manage patient records, track treatment progress, and communicate with administrators.

## Features

- **Secure Authentication**: Role-based access control with separate admin and practitioner portals
- **Patient Management**: Create, view, and manage patient profiles
- **Treatment Tracking**: Monitor treatment progress and aligner stages
- **Document Management**: Upload and store radiographs and clinical files
- **Messaging System**: Communicate with admins about specific patients
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Tables**: TanStack Table
- **Notifications**: Sonner
- **Authentication**: NextAuth.js (planned integration)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/risus-dashboard.git
   cd risus-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

For development purposes, you can use these mock accounts:

- **Admin**:

  - Email: admin@risus.com
  - Password: any password (for demo)

- **Practitioner**:
  - Email: dr.smith@risus.com
  - Password: any password (for demo)

## Project Structure

```
risus-dashboard/
├── src/
│   ├── app/               # Next.js app router routes
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utilities and helper functions
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Zustand state management
│   ├── types/             # TypeScript type definitions
│   ├── auth/              # Authentication logic
│   └── middleware.ts      # Next.js middleware for auth
├── public/                # Static assets
└── package.json           # Project dependencies
```

## Roadmap

- [ ] Patient document uploads
- [ ] Practitioner profile management
- [ ] Treatment plan visualization
- [ ] Admin analytics dashboard
- [ ] Mobile app integration
- [ ] Patient portal

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Layout inspiration from [shadcn-admin](https://github.com/satnaing/shadcn-admin)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
