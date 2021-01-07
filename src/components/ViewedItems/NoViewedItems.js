import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';

export default function NoViewedItems() {
  const { formatMessage } = useIntl();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opaciy: 0 }}
      layout
    >
      <h1 className="font-bold text-lg">
        {formatMessage({ id: 'no-viewed-items' })}
      </h1>
    </motion.div>
  );
}
