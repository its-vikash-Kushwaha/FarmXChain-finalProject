# FarmXChain 🌾⛓️

FarmXChain is a revolutionary, blockchain-powered agricultural supply chain platform designed to bring transparency, and trust between farmers, retailers, and consumers. By leveraging Ethereum blockchain technology and a modern web stack, FarmXChain provides an immutable record of a crop's journey—from the initial soil registration to the final marketplace transaction.

## 🚀 Vision
The traditional agricultural supply chain suffers from a lack of transparency and high intermediary costs. **FarmXChain** solves this by:
1.  **Immutable Traceability**: Registering crop details on-chain.
2.  **Verified Sellers**: Ensuring only authenticated farmers can list produce.
3.  **Direct Market Access**: Connecting farmers directly with retailers.

---

## 📸 Application Deep-Dive

### 🔐 Authentication & Onboarding
The platform features a secure, multi-role authentication system.

| Feature | Description | Screenshot |
| :--- | :--- | :--- |
| **User Registration** | New users can sign up as either a **Farmer** or a **Retailer**. Farmers are prompted to provide basic details and are informed that they must undergo a verification process by the admin before they can list crops. | ![Registration](screenshots/registration.png) |
| **Secure Login** | A modern, streamlined login portal. The system uses JWT (JSON Web Tokens) to manage sessions securely, ensuring that users can only access features corresponding to their authorized role. | ![Login](screenshots/login.png) |

---

### 👑 Administrator Control Panel
Administrators act as the curators of the ecosystem, ensuring platform health and user legitimacy.

#### 📊 Dashboard & Analytics
| Page | Detailed Walkthrough |
| :--- | :--- |
| **Admin Dashboard** | The central hub for administrators. It provides a real-time snapshot of the platform's scale, showing the total number of users, the count of registered farmers, and how many verification requests are currently pending. |
| **Dashboard Activity** | ![Admin Dashboard](screenshots/admin%20dashboard.png) |
| **System Statistics** | For data-driven management, the Stats page visualizes user growth and platform activity over time. This helps admins identify peak registration periods and manage resource allocation. |
| **Analytics View** | ![Admin Stats](screenshots/admin%20stats.png) |

#### 🛡️ Governance & User Management
| Page | Detailed Walkthrough |
| :--- | :--- |
| **User Management** | A comprehensive list of every user on the platform. Admins can view user roles, contact information, and account status, allowing for efficient community management and auditing. |
| **User List** | ![Admin usermanagement.png](screenshots/admin%20usermanagement.png) |
| **Farmer Verification** | **The Trust Anchor.** All farmers must be verified here. Admins review identity and land ownership documents uploaded during registration. Once satisfied, the admin "Verifies" the farmer, granting them the ability to use the blockchain registry. |
| **Verification Portal** | ![Admin User Verification](screenshots/admin%20user%20verification.png) |

---

### 🚜 Farmer Workspace
A dedicated portal for farmers to manage their digital farm and interact with the blockchain.

#### 🌿 Crop Management
| Page | Detailed Walkthrough |
| :--- | :--- |
| **Farmer Dashboard** | A personalized view for farmers to see their active listings, total sales, and the status of their current crop batches. It provides quick access to add new produce to the marketplace. |
| **Farmer Home** | ![Farmer Dashboard](screenshots/farmer%20dashboard.png) |
| **Add Crop (Blockchain)**| This is where the magic happens. Farmers enter detailed crop data including name, quantity, category, and date of harvest. They also pin their farm location via **Google Maps** and upload images. Upon submission, a transaction is triggered to record this data on the **Ethereum Blockchain**. |
| **On-Chain Registry** | ![Add Crop](screenshots/farmer%20add%20crop.png) |

#### 📁 Identity & Directory
| Page | Detailed Walkthrough |
| :--- | :--- |
| **Farmer Profile** | A professional profile page where farmers can manage their personal branding and credentials. This information is partially visible to retailers to build trust before a purchase. |
| **Profile Management** | ![Farmer Profile](screenshots/farmer%20profile.png) |
| **Farmer Directory** | A searchable index of all verified farmers on the platform. This internal directory allows for transparency and helps admins keep track of the growing farmer community. |
| **Directory View** | ![Farmer Directory](screenshots/farmer%20directory.png) |

---

### 🛒 Marketplace & Retailer Flow
Where the supply meets the demand with full traceability.

| Page | Detailed Walkthrough |
| :--- | :--- |
| **Public Marketplace**| A vibrant catalog of all verified crops available. Each listing displays the price, quantity, and a "Verification Badge." Users can click on a crop to see its full history, including its origin and the specific blockchain transaction hash. |
| **Marketplace View** | ![Marketplace](screenshots/Marketplace.png) |
| **Retailer Dashboard**| Retailers have a specialized view to manage their purchases and track the transit of crops they've acquired. It highlights the supply chain data for every item in their inventory. |
| **Retailer Home** | ![Retailer Dashboard](screenshots/retailer%20dashboard.png) |

---

### 👤 Generalized User Profile
Standardized across all roles, the **User Profile** allows individuals to update their contact information, change passwords, and maintain their digital presence on the platform.

![User Profile](screenshots/User%20Profile.png)

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS (Modern UI/UX) |
| **Backend** | Spring Boot (Java), Spring Security, JWT |
| **Database** | MySQL (Permanent Storage) |
| **Blockchain** | Solidity, Ethereum (Ganache/Remix), Web3.js |
| **Maps** | Google Maps API (Location Services) |

---

## 🏁 Getting Started

### Prerequisites
- Node.js & npm (v16+)
- JDK 17 (Java)
- MySQL Server
- Ganache (Local Blockchain Ethereum instance)

### Installation & Setup
1.  **Clone the Repository**
    ```bash
    git clone https://github.com/its-vikash-Kushwaha/FarmXChain.git
    cd FarmXChain
    ```
2.  **Backend Configuration**
    - Edit `src/main/resources/application.properties` with your MySQL and Blockchain RPC details.
    - Run: `./mvnw spring-boot:run`
3.  **Frontend Initialization**
    ```bash
    cd frontend
    npm install
    npm start
    ```
4.  **Smart Contract Deployment**
    - Open Remix IDE.
    - Deploy `CropRegistry.sol` to your Local Ganache Provider.
    - Update the Contract Address in the frontend `config.js` or backend services.

---

## 📄 Recognition
This project was developed as part of the **Infosys Springboard** internship program, aimed at solving real-world supply chain challenges through emerging technologies.
