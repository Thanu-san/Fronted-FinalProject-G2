import React from "react";
import Link from "next/link";

export default function ReturnPolicyPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center py-16 px-4 bg-white overflow-hidden text-gray-900">
      
      {/* Main Clean Card Container */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 md:p-10 border-b border-gray-100 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-gray-900">
            Return & Refund Policy
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            We want you to be completely satisfied with your purchase. If you change your mind, here is how you can return your items.
          </p>
        </div>

        {/* Content Section with Boxes */}
        <div className="p-8 md:p-10 space-y-6">
          
          {/* Policy Box 1 */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              30-Day Return Window
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              You have 30 days from the date of delivery to return your item. The item must be shipped back to our store within this timeframe to be eligible for a full refund.
            </p>
          </div>

          {/* Policy Box 2 */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Condition Requirements
            </h2>
            <ul className="text-gray-600 leading-relaxed text-sm md:text-base list-disc list-inside space-y-1.5 ml-1">
              <li>Items must be in their original, unworn, and unwashed condition.</li>
              <li>All original tags and packaging must remain fully intact.</li>
              <li>Final sale items and digital products cannot be returned.</li>
            </ul>
          </div>

          {/* Policy Box 3 */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              How to Start a Return
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              To initiate a return, please navigate to your <Link href="/profile" className="text-indigo-600 font-medium underline hover:text-indigo-700 transition-colors">Profile page</Link> and select the specific order from your Order History. A printable return shipping label will be generated for you.
            </p>
          </div>

          <div className="pt-8 flex justify-center">
            <Link 
              href="/about"
              className="px-8 py-3 font-bold text-gray-700 bg-white border border-gray-300 rounded-full transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm active:scale-95"
            >
              Contact Support
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}