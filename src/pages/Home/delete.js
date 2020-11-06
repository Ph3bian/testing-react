import React, { useState } from 'react';
import { Pane, Dialog, toaster } from 'evergreen-ui';
import { deletePost } from 'services/post';
const Delete = ({ isShown, setShown, currentPost, refetch }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deletePost(currentPost);
      if (res) {
        setLoading(false);
        console.log(res);
        toaster.success('Post Deleted');
        refetch()
        setShown(false);
        return;
      } else {
        toaster.danger('Delete Failed');
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      toaster.danger('Delete Failed');
    }
  };
  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title="Delete Post"
        intent="danger"
        onCloseComplete={() => setShown(false)}
        onConfirm={handleDelete}
        confirmLabel={loading ? 'loading...' : 'Delete'}
      >
        Click Delete Post to proceed
      </Dialog>
    </Pane>
  );
};
export default Delete;
