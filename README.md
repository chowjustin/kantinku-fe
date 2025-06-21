# KantinKu ITS Frontend

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)

This is the frontend repository for **KantinKu ITS**, a web application designed to streamline the food ordering process within the ITS campus environment. It provides a modern, user-friendly interface for both students and canteen tenants.

## ✨ Features

The application is split into two main user experiences for Students and Tenants, with a rich set of features for each.

### 👨‍🎓 For Students

* **Authentication**: Secure login and registration system for students.
* **Tenant Discovery**: Browse a list of all available food tenants on campus from the homepage.
* **Menu Viewing**: View detailed tenant pages with their complete menu, including descriptions, prices, and stock availability.
* **Interactive Cart**:
    * Add items to a shopping cart directly from a tenant's menu.
    * The cart intelligently handles orders, prompting the user for confirmation if they try to order from a new tenant while having items from another in their cart.
    * A persistent cart footer provides a summary and quick access to the checkout page.
* **Seamless Checkout**: A simple, multi-step checkout process with payment gateway integration.
* **Order Tracking**:
    * View a complete history of past and current orders.
    * Track the real-time status of payments and order preparation (e.g., Pending, Processing, Ready for Pickup).
* **Profile Management**: Students can view and edit their personal information and change their password.
* **Map Integration**: View the exact location of a tenant's canteen on an interactive map.

### 🏪 For Tenants

* **Tenant Dashboard**: A dedicated dashboard for tenants to manage their operations.
* **Order Queue Management**: View incoming orders in a real-time queue. Tenants can update the status of each order (Pending, Processing, Ready, Completed) to keep students informed.
* **Menu Management (CRUD)**:
    * Full control over their menu listings.
    * Add new menu items with details like name, description, price, and stock.
    * Edit existing items, including uploading new images for menu items.
    * Delete menu items that are no longer available.
* **Profile Management**: Tenants can update their profile, including their tenant name, contact information, and profile/store image.
* **Canteen Registration with Map**: A special registration form for new tenants, featuring a coordinate selector to pinpoint their canteen's location on a map.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v20 or later)
* pnpm (v9 or later)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/chowjustin/kantinku-fe.git
    cd kantinku-fe
    ```

2.  **Install dependencies using pnpm:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables.

    ```ini
    # .env.local
    NEXT_PUBLIC_API_URL_DEV=http://localhost:8000/api
    NEXT_PUBLIC_API_URL_PROD=https://your-production-api-url.com/api
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```

The application should now be running on [http://localhost:3000](http://localhost:3000).
