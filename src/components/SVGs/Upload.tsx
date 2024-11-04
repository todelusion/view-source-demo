import React from "react";

function Upload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 4.75V16.75H17.5001V4.75"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.97855 0.646447C9.78329 0.451184 9.46671 0.451184 9.27145 0.646447L6.08947 3.82843C5.8942 4.02369 5.8942 4.34027 6.08947 4.53553C6.28473 4.7308 6.60131 4.7308 6.79657 4.53553L9.625 1.70711L12.4534 4.53553C12.6487 4.7308 12.9653 4.7308 13.1605 4.53553C13.3558 4.34027 13.3558 4.02369 13.1605 3.82843L9.97855 0.646447ZM9.125 13.125C9.125 13.4011 9.34886 13.625 9.625 13.625C9.90114 13.625 10.125 13.4011 10.125 13.125L9.125 13.125ZM9.125 1L9.125 13.125L10.125 13.125L10.125 1L9.125 1Z"
        fill="black"
      />
    </svg>
  );
}

export default Upload;
