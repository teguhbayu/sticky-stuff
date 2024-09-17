import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import dateFormat from "dateformat";
import { useEffect, useRef } from "react";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import SubmitButton from "~/components/button";
import prisma from "~/lib/db/prisma";

export async function action({ request, context, params }: ActionFunctionArgs) {
  const form = await request.formData();
  const note = form.get("note") as string | undefined;
  if (!note || note === "")
    return jsonWithError(null, { message: "Note is empty!" });

  try {
    await prisma.notes.create({ data: { note } });
    return jsonWithSuccess({ result: 200 }, { message: "Added note!" });
  } catch (e) {
    console.log(e);
    return jsonWithError(null, { message: "Internal Sever Error!" });
  }
}

export async function loader(request: LoaderFunctionArgs) {
  const data = await prisma.notes.findMany({ orderBy: { time: "desc" } });

  return data;
}

export default function Note() {
  const data = useLoaderData<typeof loader>();
  let ref = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  let actionData = useActionData<typeof action>();
  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === "submitting") {
        ref.current?.reset();
      }
    },
    [navigation.state, actionData]
  );

  return (
    <main className="flex justify-center items-center flex-col gap-4 py-10 px-7 text-[#ffc014]">
      <div className="w-[100%] md:w-[55%] px-5 py-8 bg-[#585c50] rounded-xl min-h-[25vh] drop-shadow-glow-white">
        <h3 className="text-2xl font-semibold text-center">Add Sticky</h3>
        <div className="w-full flex flex-col justify-center my-3">
          <Form
            className="w-full flex flex-col gap-5 justify-center items-center"
            method="post"
            ref={ref}
          >
            <input
              type="text"
              className="rounded-md px-3 py-2 w-full bg-primary border-none text-white outline-none focus:outline-1 focus:outline-[#ffc014] duration-300 transition-all"
              placeholder="Write your sticky"
              title="It can be anything!"
              required
              name="note"
            />
            <SubmitButton disabled={navigation.state === "submitting"}>
              {navigation.state === "submitting" ? "Loading..." : "Add"}
            </SubmitButton>
          </Form>
        </div>
      </div>
      <div className="flex gap-5 justify-center flex-wrap w-[100%] mt-12">
        {data.map((i) => (
          <div
            className="border border-black px-3 py-3 w-[85%] md:w-1/4 h-[30vh] md:h-[16vh] lg:h-[50vh] bg-secondary relative"
            key={i.id}
          >
            <h1>{i.note}</h1>
            <p className="absolute bottom-3 right-3 text-black text-sm">
              {dateFormat(new Date(i.time), "mmm dS yyyy, h:MM:ss TT")}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
