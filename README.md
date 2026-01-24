# FarmXChain 🌾⛓️

FarmXChain is a cutting-edge, blockchain-powered agricultural supply chain platform designed to ensure transparency, traceability, and trust between farmers, distributors, and consumers. By leveraging Ethereum blockchain technology and a modern web stack, FarmXChain provides a verifiable record of a crop's journey from the soil to the marketplace.

## 🚀 Key Features

### 🔐 Secure Authentication & User Roles
- **Multi-Role System**: Dedicated interfaces for Admins, Farmers, and (future) Consumers/Distributors.
- **Secure Onboarding**: Robust registration and login flows with JWT-based authentication.

### 📊 Admin Dashboard
- **Real-time Insights**: At-a-glance view of platform health with statistics on Total Users, Registered Farmers, and Pending Verifications.
- **Actionable Metrics**: Integration with internal analytics to track platform growth and user activity.

### 🚜 Farmer Portal & Crop Management
- **Blockchain Registration**: Every crop added is uniquely registered on the Ethereum blockchain for immutable traceability.
- **Rich Data Capture**: Farmers can record crop name, quantity, harvest date, soil type, and pesticides used.
- **Interactive Location Selection**: Integrated Google Maps for precise farm location pinning.
- **Visual Evidence**: Support for high-quality crop image uploads to build consumer trust.

### 🛒 Marketplace
- **Transparent Listings**: A public catalog of crops available for purchase, complete with verification badges.
- **Detailed Traceability**: Consumers can view the exact origin, harvest details, and blockchain transaction hash for every product.

### 🛡️ Farmer Verification System
- **Trust Building**: Admin-led verification process to ensure only legitimate farmers can list their produce.
- **Document Management**: Capabilities for farmers to upload and admins to review identity and land ownership documents.

### 📈 Statistics & Analytics
- **Visual Overview**: Comprehensive charts and cards showing user distribution and verification statuses.
- **Data-Driven Decisions**: Helping administrators manage the ecosystem effectively.

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Google Maps API |
| **Backend** | Spring Boot (Java), Spring Security, JWT |
| **Database** | MySQL |
| **Blockchain** | Solidity, Ethereum (Ganache/Remix), Web3 Integration |
| **Styling** | Modern, premium UI with Inter typography and smooth animations |

## 🏁 Getting Started

### Prerequisites
- Node.js & npm
- JDK 17+
- MySQL Server
- Ganache (Local Blockchain)

### Installation
1.  **Clone the Repository**
    ```bash
    git clone https://github.com/its-vikash-Kushwaha/FarmXChain.git
    cd FarmXChain
    ```
2.  **Backend Setup**
    - Configure `application.properties` with your MySQL credentials.
    - Run the Spring Boot application using your IDE or `./mvnw spring-boot:run`.
3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm start
    ```
4.  **Blockchain Deployment**
    - Deploy `CropRegistry.sol` using Remix or Truffle to your local Ganache instance.
    - Update the contract address in the backend/frontend services as required.

## 📄 License
This project is developed for the Infosys Springboard internship program.
