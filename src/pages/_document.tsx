import Link from 'next/link';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Could not perform action</h3>
          <p className="py-4">Please login or signup inorder to perform this action</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Close
            </label>
            <Link href="/api/auth/signin">
              <label className="btn">Login/Signup</label>
            </Link>
          </div>
        </div>
      </div>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
