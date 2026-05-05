"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf } from "react-icons/fa";
import { useTheme } from "next-themes";
import { 
  HiBars3 as HiMenu, 
  HiXMark as HiX, 
  HiChevronRight, 
  HiUserCircle, 
  HiArrowLeftOnRectangle as HiOutlineLogout, 
  HiSquares2X2 as HiViewGrid,
  HiSun,
  HiMoon
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Ideas", href: "/ideas" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isAdmin, loading } = useAuth();
  const { theme, setTheme } = useTheme();

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide Navbar on dashboard-style pages
  const isDashboardPage = pathname.startsWith("/dashboard") || 
                          pathname.startsWith("/admin") || 
                          pathname.startsWith("/profile");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDashboardPage) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-emerald-50/90 dark:bg-slate-900/95 backdrop-blur-xl border-b border-emerald-100/50 dark:border-white/5 shadow-2xl py-3"
          : "bg-emerald-50/40 dark:bg-slate-950/40 backdrop-blur-md py-5"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
              <FaLeaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              EcoSpark
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-bold transition-all hover:text-emerald-600 dark:hover:text-emerald-400 relative py-1 uppercase tracking-widest",
                  pathname === link.href 
                    ? "text-emerald-600 dark:text-emerald-400" 
                    : "text-slate-600 dark:text-white/80"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 text-slate-600 dark:text-white/80 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-white/10"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && (theme === "dark" ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />)}
            </Button>

            {loading ? (
              <div className="w-24 h-10 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full gap-2 pl-2 border border-transparent hover:border-border text-slate-700 dark:text-white">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        user?.name.charAt(0)
                      )}
                    </div>
                    <span className="text-sm font-bold">{user?.name.split(" ")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-xl border-border/50 bg-white dark:bg-slate-900">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-3 p-3 w-full cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <HiViewGrid className="w-5 h-5 text-slate-400" />
                        <span className="font-bold">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <HiOutlineLogout className="w-5 h-5" />
                    <span className="font-bold">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-slate-600 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-white/10 font-bold" nativeButton={false} render={<Link href="/auth/login" />}>
                  Login
                </Button>
                <Button size="sm" className="rounded-full px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20" nativeButton={false} render={<Link href="/auth/signup" />}>
                  Join Community
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <Container className="py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-lg font-medium p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  {link.name}
                  <HiChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              ))}
              <hr className="my-2 border-muted" />
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-between px-4" 
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                >
                  <span className="font-bold">Appearance</span>
                  {mounted && (theme === "dark" ? <HiSun className="w-5 h-5 text-emerald-500" /> : <HiMoon className="w-5 h-5 text-primary" />)}
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full" nativeButton={false} render={<Link href="/auth/login" onClick={() => setIsOpen(false)} />}>
                    Login
                  </Button>
                  <Button className="w-full" nativeButton={false} render={<Link href="/auth/signup" onClick={() => setIsOpen(false)} />}>
                    Sign Up
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
