"use client"
import { useState, useEffect } from 'react';
import { db } from 'app/services/firebase/serviciosFaqs';
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';
import styles from './AdminBlogg.module.sass';

const AdminPanel = () => {
    const [content, setContent] = useState('');
    const [formattedContent, setFormattedContent] = useState<string[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
  
    // Obtener todos los posts
    useEffect(() => {
      const fetchPosts = async () => {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      };
      fetchPosts();
    }, []);
  
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const input = e.target.value;
      setContent(input);
      formatContent(input);
    };
  
    const formatContent = (input: string) => {
        const lines = input.split('\n');
        const formatted = lines.map(line => {
          // Encabezados
          if (line.startsWith('t1.')) return `<h1>${line.substring(3)}</h1>`;
          if (line.startsWith('t2.')) return `<h2>${line.substring(3)}</h2>`;
          if (line.startsWith('t3.')) return `<h3>${line.substring(3)}</h3>`;
          
          // Párrafos
          if (line.startsWith('p.')) return `<p>${line.substring(2)}</p>`;
          
          // Imagen
          if (line.startsWith('i.')) return `<img src="${line.substring(2)}" alt="Blog Image"/>`;
          
          // Negrita
          if (line.startsWith('b.')) return `<strong>${line.substring(2)}</strong>`;
          
          // Cursiva
          if (line.startsWith('i2.')) return `<em>${line.substring(3)}</em>`;
          
          // Lista no ordenada
          if (line.startsWith('ul.')) {
            const listItems = line.substring(3).split(','); // Lista no ordenada
            const listContent = listItems.map(item => `<li>${item}</li>`).join('');
            return `<ul>${listContent}</ul>`;
          }
      
          // Lista ordenada
          if (line.startsWith('ol.')) {
            const listItems = line.substring(3).split(','); // Lista ordenada
            const listContent = listItems.map(item => `<li>${item}</li>`).join('');
            return `<ol>${listContent}</ol>`;
          }
      
          // Cita
          if (line.startsWith('q.')) return `<blockquote>${line.substring(2)}</blockquote>`; 
          
          // Código en línea
          if (line.startsWith('c.')) return `<code>${line.substring(2)}</code>`; 
      
          // Bloque de código
          if (line.startsWith('pre.')) return `<pre>${line.substring(4)}</pre>`; 
      
          // Enlace
          if (line.startsWith('a.')) {
            const [text, url] = line.substring(2).split(','); // Enlace
            return `<a href="${url.trim()}">${text.trim()}</a>`;
          }
      
          // Línea horizontal
          if (line.startsWith('hr.')) return `<hr/>`; 
      
          // Salto de línea (br)
          if (line.startsWith('br.')) return `<br/>`;
      
          // En caso de que no se encuentre ninguna etiqueta, se retorna el texto tal cual.
          return line;
        });
      
        // Unir el contenido con las etiquetas procesadas
        setFormattedContent(formatted);
      };
  
    const handleSave = async () => {
      if (content) {
        if (editingPostId) {
          const postRef = doc(db, 'posts', editingPostId);
          await updateDoc(postRef, { content, formattedContent });
          setEditingPostId(null);
        } else {
          await addDoc(collection(db, 'posts'), { content, formattedContent, active: true, createdAt: new Date() });
        }
        setContent('');
        setFormattedContent([]);
      }
    };
  
    const handleEdit = (post: any) => {
      setEditingPostId(post.id);
      setContent(post.content);
      setFormattedContent(post.formattedContent);
    };
  
    return (
      <div className={styles.adminPanel}>
        <div className={styles.editor}>
          <textarea 
            value={content} 
            onChange={handleContentChange} 
            placeholder="Escribe el contenido usando los formatos (t1., t2., p., i.)"
          />
          <button onClick={handleSave}>{editingPostId ? 'Actualizar Post' : 'Guardar Post'}</button>
        </div>
        <div className={styles.preview}>
          <h3>Vista Previa</h3>
          <div dangerouslySetInnerHTML={{ __html: formattedContent.join('') }} />
        </div>
        <div className={styles.postsList}>
          <h3>Posts Existentes</h3>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <span onClick={() => handleEdit(post)}>{post.content.substring(0, 20)}...</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default AdminPanel;