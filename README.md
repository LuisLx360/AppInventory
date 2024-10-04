
# Tool Inventory management app

## About the project

This application is designed to streamline the management of tool inventory. It allows you to efficiently control the flow of entries and exits, ensuring you are always aware of the availability of each tool.

With this app, you can visualize and monitor the information generated from daily interactions, enabling you to know the current status of the tools and which employees are using them. This not only improves organization but also helps identify usage patterns and prevent losses.

Additionally, the application offers the option to export all data to an Excel file, allowing for deeper analysis and maintaining an accessible and manageable record. With this tool, managing your inventory has never been so simple and effective.
## Built With

This application was developed using the following technologies:

- **React.js**: To build a dynamic and responsive user interface.
- **Node.js**: As the runtime environment for the backend, managing server logic.
- **PostgreSQL**: For efficient database management and data storage.
- **Bootstrap**: For a modern and adaptable design, enhancing the user experience.
## Getting Started

This guide will help you set up the project locally. Follow these steps to get a local copy up and running.

### Prerequisites

Before you begin, make sure you have PostgreSQL installed for the database.

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>

2. **Install dependencies**:
    ```bash
    For the frontend:
    cd frontend
    npm install
    
    For the backend:
    cd ../backend
    npm install



3. **Set Environment variables**: 

Set up your environment variables: Create a .env file in the backend directory and fill in the required variables. Here’s an example of what your .env file should look like:
    ```bash
    (File .env)
    SECRET_KEY=

    DB_HOST="localhost"
    DB_NAME="test"
    DB_USER=
    DB_PASSWORD=
    DB_PORT=5432

4. **Generar Secret Key**

To generate a secret key, run the following command in your terminal:
    ```bash
    
    node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"        
## Usage

The primary use of this application is to facilitate tool inventory management, allowing workers and administrators to interact with the system in the following ways:

- **Select Option to Check Out or Check In**: Workers begin the process by choosing whether they want to check out or check in a tool from the inventory.

- **Select Their Name**: After selecting the option, workers must choose their name from a list to register who is performing the action.

- **Scan the Barcode**: Once their name is selected, workers scan the barcode of the tool. Immediately, an image of the tool along with its name will appear, confirming the action.

- **Live Transaction Monitoring**: While workers do not manage the data directly, the page administrator has full access. Anyone can view the transactions tab, which will be displayed on another screen, allowing for real-time tracking of inventory activities.

- **Export Data to Excel**: The administrator can also export data related to tool transactions to an Excel file for deeper analysis.

By utilizing these features, workers and administrators can maintain an organized and efficient tool inventory management system.
You can copy and paste this into your README.md. If you need further adjustments or additional
## Roadmap

### 1. Authentication and Routes
- [] Improve security and route protection.

### 2. User Interface
- [ ] Enhance the graphical interface and design to be more user-friendly.
- [ ] Improve handling of notifications and success situations within the application.

### 3. Data and Content
- [ ] Implement pagination for data and tables.
- [ ] Include a search field to facilitate data localization.

### 4. User Profile
- [ ] Allow users to edit their name, email, and password.

### 5. Roles and Permissions
- [ ] Implement roles and permissions to control access to different sections of the application.
## License

Distributed under the MIT License. See LICENSE.txt for more information.
## Contact

LuisR - Lx360tech@gmail.com
