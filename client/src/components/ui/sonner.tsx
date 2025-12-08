import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-center"
      toastOptions={{
        style: {
          background: "rgb(15 23 42)", // Opaque dark background (slate-900)
          color: "rgb(255 255 255)", // White text
          border: "2px solid rgb(20 184 166)", // Teal border
          fontSize: "16px",
          fontWeight: "600",
          padding: "16px 24px",
          minWidth: "300px",
        },
        classNames: {
          success: "!bg-green-600 text-white border-green-700 shadow-lg",
          error: "!bg-red-600 text-white border-red-700 shadow-lg",
          info: "!bg-blue-600 text-white border-blue-700 shadow-lg",
          warning: "!bg-yellow-600 text-white border-yellow-700 shadow-lg",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
