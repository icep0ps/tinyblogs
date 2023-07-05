import dynamic from 'next/dynamic';

import React, { FC } from 'react';
const Blog = dynamic(() => import('../posts/blog'));

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { inferRouterOutputs } from '@trpc/server';
import { UserRouter } from '@/server/routes/users';

type routerOutput = inferRouterOutputs<UserRouter>;

type Props = {
  blogs: routerOutput['getProfile']['posts'];
};

const Blogs: FC<Props> = (props) => {
  const { blogs } = props;
  return (
    <div className="flex flex-col gap-5 pt-10 overflow-y-scroll">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Posts</h3>
      <div>
        {blogs.map((blogs) => {
          const { id, title } = blogs;
          return (
            <Accordion type="single" collapsible className="w-full " key={id}>
              <AccordionItem value="item-1">
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>
                  <Blog id={id} post={blogs} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
