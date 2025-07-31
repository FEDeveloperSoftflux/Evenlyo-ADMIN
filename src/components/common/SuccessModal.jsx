import React, { useEffect, useRef } from 'react';

const SuccessModal = ({ isOpen, onClose, title = "Successfully Completed", message = "Your action has been completed successfully." }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      console.log('SuccessModal opened, setting 2-second timer');
      
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        console.log('SuccessModal timer triggered, closing modal');
        onClose();
      }, 2000); 

      return () => {
        console.log('SuccessModal cleanup, clearing timer');
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    } else {
      // Clear timer when modal is closed
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isOpen]); // Removed onClose from dependency array

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">

        {/* Title */}
        <h2 className="text-lg font-extrabold text-black mb-2 mt-2">
          {title}
        </h2>
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-18 h-18 bg-[#59d603] rounded-full flex items-center justify-center mt-6 mb-6">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>



      </div>
    </div>
  );
};

export default SuccessModal;
