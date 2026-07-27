import { RouterProvider } from "react-router";
import router from "./routes/routes";
import ToastViewport from "./shared_components/Toast";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastViewport />
    </>
  );
}
