import { Box, Card, Divider, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  CASE_BASE_URL,
  Comment,
  CommentBody,
  COMMENT_BASE_URL,
  NetworkCase,
} from 'src/@types/case';
import useAuth from 'src/hooks/useAuth';
import { createAsync } from 'src/services/APIGateway';
import { useSWRConfig } from 'swr';
import dayjs from 'dayjs';

type Props = {
  currentCase: NetworkCase;
};

function Comments({ currentCase }: Props) {
  const [text, setText] = useState('');
  const { user } = useAuth();
  const { mutate } = useSWRConfig();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    setText('');
    const comment = await createAsync<CommentBody, Comment>(COMMENT_BASE_URL, {
      text,
      caseId: currentCase.id,
      userId: user.id,
    });
    mutate<NetworkCase>(`${CASE_BASE_URL}/${currentCase.id}`, {
      ...currentCase,
      comments: [...currentCase.comments, comment],
    });
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {!currentCase.comments.length && (
        <Typography variant="body1" noWrap sx={{ mt: 6, alignSelf: 'center' }}>
          Aún no hay comentarios
        </Typography>
      )}
      {currentCase.comments.map((c) => (
        <Card
          key={c.id}
          sx={{
            p: 3,
            flexDirection: 'column',
            display: 'flex',
            mt: 2,
            width: 'calc(100% - 20%)',
            alignSelf: c.user.id === user?.id ? 'flex-end' : 'flex-start',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="caption" noWrap>
              {c.user?.name}
            </Typography>
            <Typography variant="caption" noWrap>
              {dayjs(c.createdAt).format('DD/MM/YYYY HH:mm')}
            </Typography>
          </Box>
          <Typography variant="body1">{c.text}</Typography>
        </Card>
      ))}
      <Divider sx={{ mb: 4, mt: 4 }} />
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe un comentario..."
        />
      </form>
    </Box>
  );
}

export default Comments;
