"use client";

import "../../../editor.css";
import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import React, { useContext } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CreatePostContext } from "../layout";
import { useRouter } from "next/navigation";
import AppLoader from "@/components/AppLoader";
import { FaChevronRight } from "react-icons/fa";

const CreatePageBody = () => {
  const postContext = useContext(CreatePostContext);
  const router = useRouter();

  if (!postContext.data.title) return router.back();

  function submitBody() {
    if (postContext.data.body && postContext.data.body.length > 10)
      router.push("/create/tags");
  }

  return (
    <AnimatedPageOpacity>
      <h1 className="page-title flex justify-between items-center">
        <div className="h-fit py-1">
          <h1 className=" leading-[0] text-lg">Write Contents</h1>
          <span className="opacity-80 app-text-error text-xs font-[600]">
            don&rsquo;t include the title or subtitle
          </span>
        </div>
        <button
          disabled={
            postContext.data.body && postContext.data.body.length < 10
              ? true
              : false
          }
          onClick={submitBody}
          className="app-btn py-1 px-2 rounded-3xl disabled:pointer-events-none disabled:opacity-50 text-sm"
          name="signup-interests-submit"
          type="submit"
        >
          {false
            ? <AppLoader />
            : <div className="flex items-center gap-2">
                <span>next</span>
                <FaChevronRight />
              </div>}
        </button>
      </h1>
      <div className="editor text-text-dark">
        <CKEditor
          editor={ClassicEditor}
          data={postContext.data.body}
          config={{
            toolbar: {
              items: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "fontColor",
                "fontBackgroundColor",
                "|",
                "bold",
                "italic",
                "link",
                "blockquote",
                "code",
                "codeBlock",
                "|",
                "bulletedList",
                "numberedList",
                "|",
                "table",
                "uploadImage",
                "mediaEmbed"
              ]
            }
          }}
          onError={() => {
            router.back();
          }}
          onChange={(_, editor) => {
            const data: string = editor.getData();
            try {
              postContext.setData({ ...postContext.data, body: data });
            } catch (e) {}
          }}
        />
      </div>
    </AnimatedPageOpacity>
  );
};

export default CreatePageBody;
