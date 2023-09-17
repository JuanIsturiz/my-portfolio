import send from "../../assets/icons/send.svg";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import { Fragment, useRef, useState } from "react";

const SERVICE_ID = import.meta.env.PUBLIC_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.PUBLIC_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.PUBLIC_PUBLIC_KEY;

export default function ContactForm() {
  const form = useRef<HTMLFormElement | null>(null);
  const [entries, setEntries] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    try {
      setIsLoading(true);

      const res = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current,
        PUBLIC_KEY
      );
      if (res.text === "OK") {
        form.current.reset();
        toast.message("Email sent successfully!", {
          description:
            "I’ll look into it right away and have an answer for you as soon as possible.",
        });
      }
      setIsLoading(false);
      setEntries({
        name: false,
        email: false,
        message: false,
      });
    } catch (error: any) {
      toast.error("Failed to sent email.");
      setIsLoading(false);
      console.log(error.text);
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div className="p-2 rounded shadow-md border shadow-gray-700 dark:border-zinc-900 dark:shadow-zinc-900 dark:shadow">
        <form
          ref={form}
          action=""
          method="POST"
          id="form"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 mb-4 font-medium">
            <label
              htmlFor="user_name"
              className="tracking-tighter dark:text-white"
            >
              Name:
            </label>
            <input
              required
              type="text"
              name="user_name"
              id="user_name"
              placeholder="Your Name"
              className="rounded text-black border-zinc-300 text-sm p-1.5 focus:border-zinc-600 focus:ring-zinc-600 dark:text-white dark:border-zinc-800 dark:focus:border-zinc-900 dark:focus:ring-zinc-900 dark:bg-black"
              autoComplete="off"
              onChange={(e) =>
                setEntries((prev) => ({
                  ...prev,
                  name: !!e.target.value.trim(),
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-1 mb-4 font-medium">
            <label
              htmlFor="user_email"
              className="tracking-tighter dark:text-white"
            >
              Email:
            </label>
            <input
              required
              type="email"
              name="user_email"
              id="user_email"
              placeholder="your.email@mail.com"
              className="rounded text-black border-zinc-300 text-sm p-1.5 focus:border-zinc-600 focus:ring-zinc-600 dark:text-white dark:border-zinc-800 dark:focus:border-zinc-900 dark:focus:ring-zinc-900 dark:bg-black"
              autoComplete="off"
              onChange={(e) =>
                setEntries((prev) => ({
                  ...prev,
                  email: !!e.target.value.trim(),
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-1 mb-4 font-medium">
            <label
              htmlFor="message"
              className="tracking-tighter dark:text-white"
            >
              Message:
            </label>
            <textarea
              required
              name="message"
              id="message"
              cols={20}
              rows={6}
              placeholder="Hi..."
              className="rounded text-black border-zinc-300 text-sm p-1.5 focus:border-zinc-600 focus:ring-zinc-600 dark:text-white dark:border-zinc-800 dark:focus:border-zinc-900 dark:focus:ring-zinc-900 dark:bg-black"
              onChange={(e) =>
                setEntries((prev) => ({
                  ...prev,
                  message: !!e.target.value.trim(),
                }))
              }
            ></textarea>
          </div>
          <div>
            {isLoading ? (
              <button
                disabled={
                  !(entries.name || entries.email || entries.message) &&
                  !isLoading
                }
                className="relative w-full flex items-center justify-center bg-zinc-950 text-white h-12 text-lg font-medium rounded border border-transparent transition-all duration-200 dark:bg-white dark:text-black"
              >
                Sending...
              </button>
            ) : (
              <button
                disabled={!(entries.name && entries.email && entries.message)}
                className="relative w-full group flex items-center justify-center bg-zinc-950 text-white h-12 text-lg font-medium rounded border border-transparent transition-all duration-200 hover:bg-white hover:text-black hover:border-zinc-300 disabled:opacity-95 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:hover:border-zinc-800"
              >
                {entries.name && entries.email && entries.message ? (
                  <img
                    src={send.src}
                    alt="Send icon"
                    className="w-7 absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 transition-all opacity-0 group-hover:opacity-90 group-hover:left-1/2 dark:invert"
                  />
                ) : (
                  <span className="absolute w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 transition-opacity opacity-0 group-hover:opacity-100">
                    Please complete the form.
                  </span>
                )}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 transition-opacity group-hover:opacity-0">
                  Send it!
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </Fragment>
  );
}
