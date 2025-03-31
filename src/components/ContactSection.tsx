
import React, { useEffect, useRef, useState } from 'react';
import AnimatedCard from './AnimatedCard';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Define the form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the email data
      const emailData = {
        to: "yuvashreecv@gmail.com",
        subject: `New contact from ${data.name}`,
        replyTo: data.email,
        message: `
          Name: ${data.name}
          Email: ${data.email}
          
          Message:
          ${data.message}
        `,
      };
      
      // Use Email JS service to send the email
      const response = await fetch("https://formsubmit.co/yuvashreecv@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      
      if (response.ok) {
        // Show success message
        toast({
          title: "Message Sent",
          description: "Thanks for reaching out! I'll get back to you soon.",
          variant: "default",
        });
        
        // Reset form
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Something went wrong",
        description: "Your message could not be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 relative"
    >
      {/* Background decorator */}
      <div className="absolute right-0 bottom-1/3 w-80 h-80 bg-lilac/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4 font-display">Get In Touch</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out to me.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <AnimatedCard className="p-8 h-full">
                <h3 className="text-2xl font-bold text-lilac-light mb-6 text-left">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start text-left">
                    <div className="w-12 h-12 bg-lilac/20 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lilac">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <p className="text-gray-300">yuvashreecv@gmail.com</p>
                      <p className="text-sm text-gray-400 mt-1">Feel free to email me anytime!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start text-left">
                    <div className="w-12 h-12 bg-lilac/20 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lilac">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Phone</h4>
                      <p className="text-gray-300">+91 73585 46732</p>
                      <p className="text-sm text-gray-400 mt-1">Available weekdays 5PM - 9 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start text-left">
                    <div className="w-12 h-12 bg-lilac/20 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lilac">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Location</h4>
                      <p className="text-gray-300">Chennai, India</p>
                      <p className="text-sm text-gray-400 mt-1">Available for remote opportunities</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-white font-medium mb-4 text-left">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/in/yuvashree-cse" className="w-10 h-10 bg-lilac/20 rounded-full flex items-center justify-center hover:bg-lilac/40 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lilac">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect width="4" height="12" x="2" y="9"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </a>
                    <a href="https://www.github.com/glowingstar-2136" className="w-10 h-10 bg-lilac/20 rounded-full flex items-center justify-center hover:bg-lilac/40 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lilac">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            </div>
            
            {/* Contact Form */}
            <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <AnimatedCard className="p-8">
                <h3 className="text-2xl font-bold text-lilac-light mb-6 text-left">Send a Message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="text-white font-medium">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="w-full px-4 py-3 bg-dark-lighter border border-lilac/20 rounded-lg focus:outline-none focus:border-lilac transition-colors text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="text-white font-medium">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email"
                              type="email"
                              {...field}
                              className="w-full px-4 py-3 bg-dark-lighter border border-lilac/20 rounded-lg focus:outline-none focus:border-lilac transition-colors text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="text-white font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message"
                              {...field}
                              rows={5}
                              className="w-full px-4 py-3 bg-dark-lighter border border-lilac/20 rounded-lg focus:outline-none focus:border-lilac transition-colors text-white resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 bg-gradient-to-r from-lilac to-lilac-light text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </Form>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
