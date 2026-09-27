"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");

  // Static mock data
  const userInfo = {
    username: "rogamer1566",
    email: "rogamer1566@gmail.com",
    phone: "+855 12 345 678",
    address: "123 St. 456, Sangkat Toul Tom Poung",
    city: "Phnom Penh",
    status: "Active Member",
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-72 shrink-0">
          {/* User Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-indigo-50 border-4 border-white shadow-md flex items-center justify-center mb-4 text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{userInfo.username}</h2>
            <p className="text-sm text-gray-500 mt-1">{userInfo.email}</p>
            <span className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {userInfo.status}
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="flex flex-col">
              <li>
                <button 
                  onClick={() => setActiveTab("info")}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-left text-sm transition-colors ${
                    activeTab === "info" 
                      ? "bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-600" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  Personal Information
                </button>
              </li>
              <li className="border-t border-gray-50">
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-left text-sm transition-colors ${
                    activeTab === "orders" 
                      ? "bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-600" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.25 2.25 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
                  </svg>
                  Recent Orders
                </button>
              </li>
              <li className="border-t border-gray-50">
                <button 
                  onClick={() => setActiveTab("saved")}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-left text-sm transition-colors ${
                    activeTab === "saved" 
                      ? "bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-600" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                  Saved Items
                </button>
              </li>
              <li className="border-t border-gray-50">
                <button 
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-left text-sm transition-colors ${
                    activeTab === "settings" 
                      ? "bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-600" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  Account Settings
                </button>
              </li>
            </ul>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <Link href="/" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Return to Store
              </Link>
            </div>
          </nav>
        </aside>

        {/* Right Content Area */}
        <section className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          
          {/* TAB 1: Personal Information */}
          {activeTab === "info" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
                  Edit Profile
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Username</p>
                    <p className="text-gray-900 font-medium">{userInfo.username}</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Email Address</p>
                    <p className="text-gray-900 font-medium">{userInfo.email}</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Phone Number</p>
                    <p className="text-gray-900 font-medium">{userInfo.phone}</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">City</p>
                    <p className="text-gray-900 font-medium">{userInfo.city}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Default Shipping Address</p>
                  <p className="text-gray-900 font-medium">{userInfo.address}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Recent Orders */}
          {activeTab === "orders" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Order History</h3>
              <div className="bg-gray-50 rounded-xl border border-gray-100 p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">No orders yet</h4>
                <p className="text-gray-500 mb-6 max-w-sm">When you place an order, its status and tracking information will appear here.</p>
                <Link href="/" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-sm">
                  Start Shopping
                </Link>
              </div>
            </div>
          )}

          {/* TAB 3: Saved Items */}
          {activeTab === "saved" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Saved Items</h3>
              <div className="bg-gray-50 rounded-xl border border-gray-100 p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Your wishlist is empty</h4>
                <p className="text-gray-500 mb-6 max-w-sm">Save items you like here so you can easily find them later when you are ready to buy.</p>
                <Link href="/products" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-sm">
                  Browse Products
                </Link>
              </div>
            </div>
          )}

          {/* TAB 4: Account Settings */}
          {activeTab === "settings" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h3>
              <div className="space-y-4">
                
                <div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-gray-900 font-semibold">Email Notifications</p>
                    <p className="text-sm text-gray-500 mt-1">Receive updates on your order status and promotions</p>
                  </div>
                  {/* Toggle Switch */}
                  <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-gray-900 font-semibold">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  {/* Toggle Switch (Off state) */}
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button className="text-red-600 font-semibold hover:text-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>

              </div>
            </div>
          )}

        </section>
      </div>
    </main>
  );
}