import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const headingClasses = {
  2: "text-3xl mb-3",
  3: "text-2xl mb-2",
  4: "text-xl mb-2",
  5: "text-lg mb-2",
};

export function ContentRenderer({ blocks }) {
  const formatText = (children) => {
    return children.map((child, index) => {
      if (child.type === "text") {
        let text = child.text;

        const formattedText = text.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < text.split("\n").length - 1 && <br />}
          </React.Fragment>
        ));

        if (child.bold) {
          return formattedText.map((fragment, i) => (
            <b key={`${index}-${i}`}>{fragment}</b>
          ));
        }
        if (child.italic) {
          return formattedText.map((fragment, i) => (
            <em key={`${index}-${i}`}>{fragment}</em>
          ));
        }
        return formattedText;
      }
      if (child.type === "link") {
        return (
          <Link
            href={child.url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {formatText(child.children)}
          </Link>
        );
      }
      return null;
    });
  };

  return blocks.map((block, index) => {
    if (block.type === "paragraph") {
      return (
        <p key={index} className="mb-4">
          {formatText(block.children)}
        </p>
      );
    }
    if (block.type === "image") {
      const width = 960;
      const height = 540;

      return (
        <figure key={index} className="mt-8 mb-12">
          <Image
            src={block.image.url}
            alt={block.image.alternativeText || ""}
            width={width}
            height={height}
            className="w-full h-auto mb-2 border border-black yellow-cursor"
          />
          {block.image.caption && (
            <figcaption className="text-xs text-center text-black md:px-24">
              <FontAwesomeIcon icon={faCircleInfo} className="mr-1 w-3 h-3" />
              {block.image.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    if (block.type === "heading") {
      const HeadingTag = `h${block.level}`;
      const headingClass = headingClasses[block.level] || "text-xl";
      return (
        <HeadingTag key={index} className={`${headingClass} mt-8`}>
          {formatText(block.children)}
        </HeadingTag>
      );
    }
    if (block.type === "quote") {
      return (
        <blockquote
          key={index}
          className="border border-black text-xl text-center italic p-4 my-8 md:p-8"
        >
          <FontAwesomeIcon icon={faQuoteLeft} className="mr-2 w-7 h-7" />
          {formatText(block.children)}
        </blockquote>
      );
    }
    if (block.type === "list") {
      const ListTag = block.format === "ordered" ? "ol" : "ul";
      const listClass =
        block.format === "ordered"
          ? "list-decimal pl-6 mb-4"
          : "list-disc pl-6 mb-4";
      return (
        <ListTag key={index} className={listClass}>
          {block.children.map((item, itemIndex) => (
            <li key={itemIndex}>{formatText(item.children)}</li>
          ))}
        </ListTag>
      );
    }
    return null;
  });
}

export default ContentRenderer;
