"use client"

import { useForm } from "react-hook-form";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface FormData {
    name: string;
    email: string;
    query: string;
}

const Page = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const onSubmit = async (data: FormData) => {
        if (!captchaVerified) {
            setError("Please verify the CAPTCHA.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                setError("Failed to send message. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const handleCaptcha = (value: string | null) => {
        if (value) {
            setCaptchaVerified(true);
        }
    };

    return (
        <section className="max-w-[1200px] mx-4 md:mx-auto ">
            <h2 className="text-section-header text-center my-12">Contact Me</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                    className="p-2 rounded bg-secondary"
                />
                {errors.name && <div className="text-red-500">{errors.name.message}</div>}

                <input
                    type="email"
                    placeholder="Your Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            message: "Invalid email address",
                        },
                    })}
                    className="p-2  rounded bg-secondary"
                />
                {errors.email && <div className="text-red-500">{errors.email.message}</div>}

                <textarea
                    placeholder="Your Query"
                    {...register("query", { required: "Query is required" })}
                    className="p-2  rounded bg-secondary"
                />
                {errors.query && <div className="text-red-500">{errors.query.message}</div>}

                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">Your message has been sent!</div>}

                {/* reCAPTCHA Component */}
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} // Replace with your actual site key
                    onChange={handleCaptcha}
                    className="my-4"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-secondary hover:bg-[#1b1b1b]  text-white py-2 rounded-lg disabled:bg-gray-400"
                >
                    {loading ? "Sending..." : "Submit"}
                </button>
            </form>
        </section>
    )
}

export default Page;
