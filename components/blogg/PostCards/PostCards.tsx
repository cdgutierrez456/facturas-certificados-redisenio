import { useState } from "react";
import styles from "./PostCards.module.sass";

export const PostList = ({ posts, onEdit, onDelete }: any) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  const filteredPosts = posts.filter((post: any) =>
    post.mainTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <button className={styles.toggleButton} onClick={togglePanel}>
        {isPanelOpen ? "Close" : "Edit Posts"}
      </button>

      <div className={`${styles.editPanel} ${isPanelOpen ? styles.open : ""}`}>
        {isPanelOpen && (
          <div className={styles.panelContent}>
            <h3>Edit Posts</h3>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className={styles.panelPostList}>
              {filteredPosts.map((post: any) => (
                <div key={post.id} className={styles.postCard}>
                  {post.imgUri && (
                    <img
                      src={post.imgUri}
                      alt="Post Image"
                      className={styles.postCardImage}
                    />
                  )}
                  <div className={styles.postCardContent}>
                    <h4>{post.mainTitle}</h4>
                    <p>{post.briefDescription}</p>
                    <div className={styles.cardActions}>
                      <button className={styles.cardButton} onClick={() => onEdit(post)}>
                        Edit
                      </button>
                      <button
                        className={styles.cardButton}
                        onClick={() => onDelete(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
