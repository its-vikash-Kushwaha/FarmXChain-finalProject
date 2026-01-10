# Fix Registration Error and Logo

## Pending Tasks

### 🔧 Fix Registration Form
- **Issue**: Registration fails because the backend expects a "name" field, but the frontend form doesn't collect it.
- **Solution**: Add a "name" input field to the registration form in Register.jsx.
- **Files to Modify**: `frontend/src/pages/Register.jsx`

### 🎨 Fix Logo Component
- **Issue**: Current Logo.jsx uses a custom SVG that may not be the best representation.
- **Solution**: Update Logo.jsx to use the official logo.svg from public folder for better branding.
- **Files to Modify**: `frontend/src/components/Logo.jsx`

## Followup Steps
- Test registration after adding name field
- Verify logo displays correctly across all pages
