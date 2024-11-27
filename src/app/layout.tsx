import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SidebarPage  from "@/app/sidebar/page"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark`} >
        <SidebarProvider>
          <SidebarPage/>
            <main>
              <SidebarTrigger/>
              {children}
            </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
