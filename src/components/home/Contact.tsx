import React from "react";
import Image from "next/image";
import shopLogo from "@/assets/svg/shop-logo.svg";
import Upload from "@/components/SVGs/Upload";

interface ContactFormData {
  name: string;
  email: string;
  brandName: string;
  location: string;
  file: File | null;
  message: string;
}

function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      brandName: formData.get("brandName") as string,
      location: formData.get("location") as string,
      file: formData.get("file") as File,
      message: formData.get("message") as string,
    };

    console.log("Form values:", formValues);
  };

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-between xl:flex-row">
      <div className="w-full max-w-[622px] space-y-5 xl:max-w-none">
        <Image src={shopLogo} alt="" className="w-22 xl:w-28" />
        <h2 className="font-arial-rounded text-[55px] leading-[1.2] tracking-[-2.2px] xl:text-[100px] xl:leading-none">
          Want to be on <br />
          our shelves?
        </h2>
        <p className="max-w-[530px] font-pp-neue text-[15px] leading-[1.6] tracking-[0.3px] xl:text-[19px] xl:leading-[1.7] xl:tracking-[0.19px]">
          Have questions, want recommendations, or want to tell us about a small
          business you love? Reach out! If you’re a business owner featured in
          our directory, reach out with bios, images, etc. below.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-[622px] space-y-7"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block font-pp-neue text-[15px] leading-[1.6] tracking-[0.3px]"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border-b border-b-LOCAVORE-BLACK bg-transparent focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-pp-neue text-[15px] leading-[1.6] tracking-[0.3px]"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border-b border-b-LOCAVORE-BLACK bg-transparent focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="brandName"
              className="block font-pp-neue text-[15px] leading-[1.6] tracking-[0.3px]"
            >
              Brand Name *
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              required
              className="w-full border-b border-b-LOCAVORE-BLACK bg-transparent focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block font-pp-neue text-[15px] leading-[1.6] tracking-[0.3px]"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              className="w-full border-b border-b-LOCAVORE-BLACK bg-transparent focus:outline-none"
            />
          </div>

          <div>
            <div className="mb-2 block font-pp-neue text-[15px] leading-[1.6] tracking-[0.3px]">
              Sell Sheet or Product Catalog*
            </div>
            <label htmlFor="file"></label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              className="hidden"
            />
            <label
              htmlFor="file"
              className="flex w-full cursor-pointer items-center justify-start rounded-lg border border-dashed border-LOCAVORE-BLACK bg-LOCAVORE-PAPER-WHITE py-[17px] pl-5 text-LOCAVORE-BLACK"
            >
              <Upload className="mr-[10px]" />
              <span className="text-[15px] leading-[1.6] tracking-[0.3px]">
                Upload a file
              </span>
            </label>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-pp-neue text-[15px] leading-[1.6] tracking-[0.3px]"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="h-[142px] w-full resize-none rounded-[5px] border border-LOCAVORE-BLACK bg-transparent focus:outline-none"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-max rounded-full bg-black px-5 py-2 font-pp-neue text-white transition-colors hover:bg-gray-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
