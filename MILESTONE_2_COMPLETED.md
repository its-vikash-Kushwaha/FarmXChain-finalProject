# Milestone 2 Completion Report: Crop Listing & Blockchain Traceability

## Summary of Work
The milestone has been fully implemented with the following key components:

### 1. Database Implementation (MySQL)
- [x] **New Table **: Added `crops` table to `database-setup.sql`.
- [x] **Entity Relationship**: `Crop` entity linked to `Farmer` entity.
- [x] **Schema**: Captures crop details + blockchain hashes.

### 2. Blockchain Integration (Free/Local)
- [x] **Smart Contract**: `CropRegistry.sol` created for crop registration.
- [x] **Backend Integration**: Updated `BlockchainService.java` to use **Web3j**.
    - **Logic**: Automatically detects if a local blockchain node is available at `http://localhost:8545`.
    - **Fallback**: If no node is detected, it gracefully falls back to a **cryptographic simulation** (SHA-256), ensuring the app works "free of cost" without setup hurdles.
    - **Configuration**: Added placeholders in `application.properties` for Node URL, Private Key, and Contract Address.

### 3. Backend Services (Spring Boot)
- [x] **CropController**: REST API for adding/retrieving crops.
- [x] **CropService**: Business logic to coordinate DB verification and Blockchain registration.

### 4. Frontend (React)
- [x] **CropManagement.jsx**: UI for farmers to manage listings.
- [x] **CropList.jsx**: Displays crops with "Verified" status.

## How to Run with Real Blockchain (Optional)
To enable the *real* blockchain integration instead of simulation:
1.  Install **Ganache** (or any local Ethereum node).
2.  Start Ganache on port `8545`.
3.  Deploy `CropRegistry.sol` using Remix or Hardhat/Truffle.
4.  Update `src/main/resources/application.properties` with:
    - `blockchain.contract.address`: The address of the deployed contract.
    - `blockchain.private-key`: A private key from Ganache.
5.  Restart the backend.

The application will now output "Connected to blockchain node" in the logs.

## Verification
- **GET /api/v1/crops/my-crops**: Returns farmer's crops.
- **POST /api/v1/crops/add**: Adds a crop (and registers on blockchain).
- **Frontend**: "Blockchain Registered" badge appears on successful addition.
