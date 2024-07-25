// workshopComponents/workshopItem.jsx
import React from 'react';

const WorkshopItem = ({ article, handleDelete, navigate }) => {
  const formattedDate = new Date(article.last_updated).toLocaleString(); // Adjust date format as needed

  return (
    <div>
        <button
            className="bg-stone-100 rounded-md border-2 border-black mt-20 flex justify-center items-center p-5 flex-col shadow-[rgba(6,24,44,0.4)_0px_0px_0px_2px,_rgba(6,24,44,0.65)_0px_4px_6px_-1px,_rgba(255,255,255,0.08)_0px_1px_0px_inset]"
            onClick={() => navigate(`/workshop/edit/${article.article_id}`)}>
            <h2 className="text-3xl font-bold text-center">Title: {article.title}</h2>
            <p className="text-sm font-bold text-gray-500">Created: {formattedDate}</p>
            <img src={`/images/${article.picture_link}`} alt={`${article.pic_caption}`} className="mt-10" />
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(article.article_id); }}>
                <img src={`/images/Trash.png`} alt="Button Icon" className="w-10 h-10 mt-5" />
            </button>
        </button>
    </div>
  );
};

export default WorkshopItem;