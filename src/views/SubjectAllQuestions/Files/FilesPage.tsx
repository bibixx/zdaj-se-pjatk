import { Folder, File, Download, FolderUp } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { FILES_RAW_PATH } from 'constants/env';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from 'components/ui/table';
import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { Header } from 'components/Header/Header';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';
import { useFiles } from 'hooks/useFiles/useFiles';
import { FileSystem } from 'validators/filesList';

import { FilesPageSkeleton } from './FilesPageSkeleton';

interface FileRowProps {
  name: string;
  path: string[];
}

const FileRow = ({ name, path }: FileRowProps) => {
  const fileUrl = `${FILES_RAW_PATH}${[...path, name].join('/')}?raw=true`;

  return (
    <TableRow className="cursor-pointer hover:bg-muted/50 group">
      <TableCell className="p-0">
        <a
          href={fileUrl}
          download
          className="flex items-center gap-2 w-full p-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <File className="h-4 w-4" />
          <span className="flex-1">{name}</span>

          <Tooltip>
            <TooltipContent>Pobierz</TooltipContent>
            <TooltipTrigger asChild>
              <Download className="h-4 w-4 -mt-1 opacity-0 group-hover:opacity-100" />
            </TooltipTrigger>
          </Tooltip>
        </a>
      </TableCell>
    </TableRow>
  );
};

const FolderUpRow = ({ to }: { to: string }) => (
  <TableRow className="cursor-pointer hover:bg-muted/50">
    <TableCell to={to}>
      <div className="flex items-center gap-2 w-full">
        <FolderUp className="h-4 w-4 fill-blue-100/35" />
        ..
      </div>
    </TableCell>
  </TableRow>
);

const DirectoryRow = ({ name, to }: { name: string; to: string }) => (
  <TableRow className="cursor-pointer hover:bg-muted/50">
    <TableCell to={to}>
      <div className="flex items-center gap-2 w-full">
        <Folder className="h-4 w-4 fill-blue-100/35" />
        {name}/
      </div>
    </TableCell>
  </TableRow>
);

const sortDirectoriesAndFiles = (data: FileSystem) => {
  const directories = Object.entries(data.subdirectories || {}).sort(([a], [b]) => a.localeCompare(b));
  const files = [...data.files].sort((a, b) => a.localeCompare(b));
  return { directories, files };
};

export const FilesPage = () => {
  const { data, state } = useFiles();
  const { '*': path } = useParams();

  const currentPath = path ? path.split('/') : [];

  const getCurrentDirectory = (data: FileSystem): FileSystem => {
    return currentPath.reduce((acc, dir) => {
      return acc.subdirectories?.[dir] ?? acc;
    }, data);
  };

  const getParentPath = () => {
    if (currentPath.length === 0) {
      return null;
    }
    const parentPath = currentPath.slice(0, -1);
    return parentPath.length ? `/files/${parentPath.join('/')}` : '/files';
  };

  const breadcrumbs = [
    {
      content: <span className="whitespace-nowrap">Generatory 3.0</span>,
      id: 'root',
      to: '/',
    },
    { content: 'Pliki', to: '/files' },
    ...currentPath.map((dir, index) => ({
      content: dir,
      to: `/files/${currentPath.slice(0, index + 1).join('/')}`,
    })),
  ];

  const header = (
    <>
      <Helmet>
        <title>Pliki | Generatory 3.0</title>
      </Helmet>
      <div className="pl-0 max-md:pl-2 pr-2 max-md:pr-4">
        <Header>
          <BreadCrumbs crumbs={breadcrumbs} />
        </Header>
      </div>
    </>
  );

  if (state === 'loading') {
    return (
      <div>
        {header}
        <Table>
          <TableHeader>
            <TableRow hasHover={false}>
              <TableHead className="max-md:pl-4">Nazwa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <FilesPageSkeleton />
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const currentDirectory = getCurrentDirectory(data);
  const { directories, files } = sortDirectoriesAndFiles(currentDirectory);

  return (
    <div>
      {header}
      <Table>
        <TableHeader>
          <TableRow hasHover={false}>
            <TableHead className="max-md:pl-4">Nazwa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPath.length > 0 && <FolderUpRow to={getParentPath()!} />}
          {directories.map(([name]) => (
            <DirectoryRow key={name} name={name} to={`/files/${[...currentPath, name].join('/')}`} />
          ))}
          {files.map((file) => (
            <FileRow key={file} name={file} path={currentPath} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
