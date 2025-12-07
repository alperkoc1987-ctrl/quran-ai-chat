import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          background: "hsl(var(--popover))",
          color: "hsl(var(--popover-foreground))",
          border: "1px solid hsl(var(--border))",
        },
        classNames: {
          success: "bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-50 border-green-200 dark:border-green-700",
          error: "bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-50 border-red-200 dark:border-red-700",
          info: "bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-50 border-blue-200 dark:border-blue-700",
          warning: "bg-yellow-50 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-50 border-yellow-200 dark:border-yellow-700",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
