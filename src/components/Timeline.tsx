import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "Step 1: Donor Registration",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Donors sign up and provide essential health details to ensure eligibility for donation. This step ensures that only healthy individuals donate, minimizing any risk.
          </p>
          <div className="w-full">
            <Image
              src="/urgent1.png" // Path to the image in the public folder
              alt="Donor registration"
              width={500} // Adjust width as needed
              height={300} // Adjust height to maintain aspect ratio
              className="rounded-lg object-cover w-full h-auto shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 2: Health Check-Up",
      content: (
        <div>
          <p className="font-bold dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Donors undergo a quick health screening to ensure safe blood donation. This includes checking hemoglobin levels, blood pressure, and general fitness.
          </p>
          <div className="w-full">
            <Image
              src="/urgent2.png" // Path to the image in the public folder
              alt="Health check-up"
              width={500} // Adjust width as needed
              height={300} // Adjust height to maintain aspect ratio
              className="rounded-lg object-cover w-full h-auto shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 3: Blood Donation Process",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            A painless process where the donor gives blood, typically taking 10-15 minutes. The collected blood is carefully handled to ensure safety and effectiveness.
          </p>
          <div className="w-full">
            <Image
              src="/urgent3.png" // Path to the image in the public folder
              alt="Blood donation"
              width={500} // Adjust width as needed
              height={300} // Adjust height to maintain aspect ratio
              className="rounded-lg object-cover w-full h-auto shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 4: Blood Processing",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            The donated blood is processed, tested, and stored for future use. Tests are conducted to ensure the blood is free from infections and safe for transfusion.
          </p>
          <div className="w-full">
            <Image
              src="/urgent4.png" // Path to the image in the public folder
              alt="Blood storage"
              width={500} // Adjust width as needed
              height={300} // Adjust height to maintain aspect ratio
              className="rounded-lg object-cover w-full h-auto shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 5: Blood Matching Allocation",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Blood is matched with patients in need and allocated accordingly. Hospitals and blood banks ensure the right type of blood reaches those in need urgently.
          </p>
          <div className="w-full">
            <Image
              src="/urgent5.png" // Path to the image in the public folder
              alt="Blood transfusion"
              width={500} // Adjust width as needed
              height={300} // Adjust height to maintain aspect ratio
              className="rounded-lg object-cover w-full h-auto shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}