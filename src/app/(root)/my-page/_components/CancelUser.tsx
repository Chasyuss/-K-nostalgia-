import React, { forwardRef, useImperativeHandle } from 'react';
import { toast } from '@/components/ui/use-toast';
import api from '@/service/service';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import useDeviceSize from '@/hooks/useDeviceSize';

export interface CancelUserHandle {
  handleDeleteUser: () => void;
}

const CancelUser = forwardRef<CancelUserHandle>((_, ref) => {
  const router = useRouter();
  const { isDesktop } = useDeviceSize();

  const handleDeleteUser = async () => {
    try {
      Swal.fire({
        title: '탈퇴하시겠습니까?',
        html: `<div id="swal2-html-container" class="swal2-html-container" style="padding:0 !important; margin:-1rem; font-size:16px;"> 탈퇴시, 계정 복구는 불가능합니다.</div>`,
        showCancelButton: true,
        cancelButtonColor: '#9C6D2E',
        confirmButtonColor: '#f2f2f2',
        cancelButtonText: '취소',
        confirmButtonText: '탈퇴하기',
        customClass: {
          title: 'text-xl mt-10 md:mb-[8px]',
          popup: 'rounded-[16px]',
          actions: 'flex gap-3 mb-6 mt-9 md:mt-[40px] md:mb-[28px]',
          confirmButton:
            'text-status-negative py-3 px-4 rounded-[12px] w-[138px] m-0',
          cancelButton: 'text-white py-3 px-4 rounded-[12px] w-[138px] m-0'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.auth.deleteUser();
            toast({
              variant: 'destructive',
              description: '탈퇴되었습니다. 다음에 다시 이용해주세요.'
            });
            router.push('/log-in');
          } catch (error) {
            console.error('탈퇴 에러');
            toast({
              variant: 'destructive',
              description: '탈퇴가 불가능합니다.'
            });
          }
        }
      });
    } catch (error) {
      console.error('탈퇴 과정에서 에러가 발생했습니다.');
    }
  };

  useImperativeHandle(ref, () => ({
    handleDeleteUser
  }));

  if (isDesktop) return null;

  return (
    <div className="p-4 md:hidden">
      <div
        className="flex items-center py-[3px] cursor-pointer"
        onClick={handleDeleteUser}
      >
        <div className="cursor-pointer underline text-label-alternative mt-6 md:hidden">
          {' '}
          회원탈퇴{' '}
        </div>
      </div>
    </div>
  );
});

export default CancelUser;
