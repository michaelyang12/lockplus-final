import { useState } from 'react';
import { useRouter } from 'next/router';
import HomeSidebar from './HomeSidebar';

function SettingsForm() {


  /*
  Settings Ideas: 
  - Time limit for history (1 week, 30 days, 90 days, 1 year)
  - 
  
  
  
  
  */
  

  return (
    <div class="relative container h-screen w-screen p-7 bg-lockplus-backgroundBlue visible text-lockplus-textGray">
        <div class="text-xl mt-0.5 font-light">
            Settings
        </div>
    </div>
  );
}
export default SettingsForm;
