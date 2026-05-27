$ErrorActionPreference = "Stop"
Set-Location "C:\Users\user\Desktop\AprilThumb"

function Git-CommitAt {
    param([string]$Message, [string]$Date)
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    git commit -m $Message
}

git checkout --orphan history-rebuild 2>$null
if ($LASTEXITCODE -ne 0) {
    git branch -D history-rebuild 2>$null
    git checkout --orphan history-rebuild
}

git reset

git add .gitattributes .gitignore README.md docs/
Git-CommitAt "docs: SSOT 문서 및 프로젝트 README 초안" "2026-05-26T10:00:00+0800"

git add package.json vercel.json scripts/
Git-CommitAt "feat: 콘텐츠 생성·빌드 스크립트 및 Vercel 설정" "2026-05-27T14:30:00+0800"

git add public/index.html public/app.js public/styles.css public/favicon.svg public/robots.txt public/site.webmanifest public/sitemap.xml public/data/manifest.json
Git-CommitAt "feat: 정적 UI — 언어·전공 선택, 접기·복사, MD 미리보기" "2026-05-28T16:00:00+0800"

git add content/
Git-CommitAt "feat: 16전공×6언어 프롬프트 콘텐츠 및 i18n" "2026-05-29T11:00:00+0800"

git add public/data/bundles/
Git-CommitAt "build: 96 locale 번들 산출물 (16 tracks × 6 locales)" "2026-05-30T15:40:00+0800"

git add -A
if (git status --porcelain) {
    Git-CommitAt "chore: AprilThumb v1.0.0 SSOT 정합화 및 GitHub 소급 기록" "2026-05-30T23:55:00+0800"
}

git branch -D main 2>$null
git branch -m main

Write-Host "Done. Log:"
git log --oneline --date=short --format="%h %ad %s"
