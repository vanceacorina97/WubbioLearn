import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export const CustomSkeleton = () => {

    return (
        <div>
            <Skeleton variant="text" width={330} />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={330} height={280} />
            <Skeleton variant="text" width={330} />
            <Skeleton variant="text" width={330} />
        </div>
    );
}