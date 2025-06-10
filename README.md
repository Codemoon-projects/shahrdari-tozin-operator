remember below data for all chat in the project
# shahrdari project
this project writed in below languages:

use daisyUI and tailwindcss for elements and blocks in project

## **Technologies Used**

### 1. **Next.js 15**
### 2. **Redux**
### 3. **Framer Motion**
### 4. **React Icons**
### 5. **Daisy UI**

## **Folder Structure**
The project follows a modular folder structure for maintainability:

```
/src
├── /components # Reusable UI components
├───── /ui
├──────── /button.tsx
├──────── /inputs.tsx
├── /app # Next.js pages
├───── /globals.css # Global and component-specific styles
├── /store # Redux store, reducers, and actions
├───── /core # core data in project here
├───── /slice # data slices are here
├───── /user # user slice and thunk
├───── /store.tsx # main store of redux here
├───── /hooks.tsx # useAppSelector and useAppDispatch are here
├── /hook # Helper functions and utilities
└── /public # Static assets (images, icons, etc.)
```

## **Key Features**

### **Dynamic Routing with Next.js**
- Seamless navigation between pages.
- Implemented using `getStaticProps` and `getServerSideProps` for data fetching.

### **Global State Management with Redux**
- All application-wide states, including user authentication and notifications, are managed centrally.

### **Interactive Animations**
- Framer Motion provides smooth transitions between states, creating a modern and engaging interface.

### **Icon Consistency**
- React Icons ensures all icons are visually aligned with the application's theme and design language.

## **Best Practices**
1. **Code Splitting:**
- Reduce initial page load time by splitting JavaScript bundles.
- Utilize Next.js's dynamic imports.

2. **Responsive Design:**
- Use Tailwind CSS for creating a mobile-first, responsive interface.

3. **Performance Optimization:**
- Optimize images and use lazy loading for non-critical assets.
- Leverage Next.js's built-in support for static optimization.

4. **Linting and Code Quality:**
- Always run the linter before submitting code to ensure compliance with coding standards.
- Use **ESLint** with a predefined configuration to catch errors and enforce best practices.
- Add a pre-commit hook using **Husky** to ensure the linter runs automatically before commits.

5. **Type Checking:**
- Use TypeScript for safer code and better developer experience (if applicable).
