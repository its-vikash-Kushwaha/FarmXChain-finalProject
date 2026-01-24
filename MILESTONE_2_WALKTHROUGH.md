# Walkthrough - Milestone 2: Crop Listing & Blockchain Traceability

## Overview
This milestone enables farmers to list their crops with details such as quantity, harvest date, and quality certificates. Crucially, it integrates a blockchain traceability layer where each crop batch is "registered" with a cryptographic hash, ensuring data immutability.

## 1. Smart Contract (`CropRegistry.sol`)
A Solidity smart contract has been created to govern the registration of crops on the blockchain.
- **Location**: `src/main/resources/contracts/CropRegistry.sol`
- **Features**:
    - `registerCrop`: Records crop details (ID, name, quantity, location, hash) on-chain.
    - `verifyCrop`: Verifies the integrity of crop data against the on-chain hash.

## 2. Backend Implementation (`FarmXChain`)
The Spring Boot backend handles the business logic and interfaces with the blockchain layer.

### Entities & Repositories
- **Crop Entity**: Stores crop metadata (`cropName`, `quantityKg`, `harvestDate`) and blockchain records (`blockchainHash`, `blockchainTxHash`).
- **CropRepository**: Standard JPA repository for database operations.

### Services
- **CropService**: Manages the lifecycle of a crop listing. correctly links farmers to their crops.
- **BlockchainService**: 
    - Currently configured for **Simulation Mode** for rapid prototyping without a live node.
    - Generates SHA-256 hashes of crop data to simulate the "mining" process.
    - Returns a distinct `blockchainTxHash` for the frontend to display.
    - *Ready for Web3j integration*: The structure allows easy swapping of the simulation method with a real `web3j.transactionManager().sendTransaction(...)` call using the ABI from `CropRegistry.sol`.

### API Endpoints (`CropController`)
- `POST /api/v1/crops/add`: Adds a crop and triggers blockchain registration.
- `GET /api/v1/crops/my-crops`: Retrieves crops for the logged-in farmer.
- `GET /api/v1/crops/{id}/verify-blockchain`: Verifies the integrity of the record.

## 3. Frontend Implementation (`frontend`)
The React frontend provides the user interface for these features.

### Pages & Components
- **CropManagement.jsx**: A comprehensive dashboard for farmers to:
    - View their list of crops.
    - Add new crops via a form (validated input).
    - See visual indicators of "Blockchain Registered".
- **CropList.jsx**: Displays the list of crops. Includes a "Verify Blockchain" button that cross-references the local data with the (simulated) blockchain record.
- **Dashboard Integration**: The main Dashboard now conditionally renders a "Crop Management" card for users with the `FARMER` role.

## Usage Flow
1. **Login** as a Farmer (e.g., `farmer1@farmxchain.com`).
2. Navigate to **Crop Management** from the Dashboard.
3. Click **Add New Crop** and fill in details (Name, Quantity, Harvest Date).
4. Submit the form. The system will:
    - Save to MySQL.
    - Generate a Data Hash.
    - "Mint" a transaction (simulated).
    - Return a Transaction Hash.
5. The new crop appears in the list with a **Blockchain Registered** badge.
6. Click **Verify Blockchain** to confirm the data hasn't been tampered with.

## Next Steps
- **Deploy Smart Contract**: Compile `CropRegistry.sol` and deploy to a testnet (e.g., Sepolia).
- **Integrate Web3j**: Update `BlockchainService` to use the contract address and private key to send real transactions.
